import os
from pathlib import Path
from datetime import datetime

def should_include_file(file_path):
    """
    Determine if a file should be included in the frontend documentation.
    """
    # Folders and patterns to exclude
    exclude_patterns = [
        'node_modules',
        'dist',
        '.git',
        '.vscode',
        '.idea',
        'coverage',
        '.next',
        '.cache',
        '.parcel-cache',
        '.env',  # Exclude actual env file for security
        '.DS_Store',
        'Thumbs.db',
        '*.log',
        'npm-debug.log',
        'yarn-error.log',
        'pnpm-debug.log',
        '.pnp',
        '.pnp.js'
    ]
    
    # Check if any exclude pattern is in the path
    path_str = str(file_path).replace('\\', '/')
    for pattern in exclude_patterns:
        if pattern.replace('*', '') in path_str:
            return False
    
    # Include these file types and names
    include_extensions = [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.css',
        '.scss',
        '.sass',
        '.less',
        '.md',
        '.json',
        '.yml',
        '.yaml',
        '.html',
        '.svg',  # Only if it's a component or asset
        '.env.example',
        'Dockerfile',
        '.gitignore',
        '.prettierrc',
        '.eslintrc.json',
        'nginx.conf'
    ]
    
    # Special files to include
    special_files = [
        'Dockerfile',
        '.gitignore',
        '.prettierrc',
        '.eslintrc.json',
        'nginx.conf',
        '.env.example',
        'package.json',
        'tsconfig.json',
        'tsconfig.node.json',
        'vite.config.ts',
        'tailwind.config.js',
        'postcss.config.js',
        'index.html'
    ]
    
    file_name = os.path.basename(path_str)
    
    # Check if it's a special file
    if file_name in special_files:
        return True
    
    # Check file extensions
    for ext in include_extensions:
        if path_str.endswith(ext):
            # Skip SVG files in public/images or dist
            if ext == '.svg' and ('public/images' in path_str or 'dist' in path_str):
                return False
            return True
    
    return False

def get_language_for_file(file_path):
    """
    Get the appropriate language identifier for syntax highlighting.
    """
    extension_map = {
        '.ts': 'typescript',
        '.tsx': 'tsx',
        '.js': 'javascript',
        '.jsx': 'jsx',
        '.css': 'css',
        '.scss': 'scss',
        '.sass': 'sass',
        '.less': 'less',
        '.md': 'markdown',
        '.json': 'json',
        '.yml': 'yaml',
        '.yaml': 'yaml',
        '.html': 'html',
        '.svg': 'xml',
        '.env.example': 'bash',
        'Dockerfile': 'dockerfile',
        '.gitignore': 'gitignore',
        '.prettierrc': 'json',
        '.eslintrc.json': 'json',
        'nginx.conf': 'nginx'
    }
    
    file_name = os.path.basename(file_path)
    
    # Check special files first
    special_lang_map = {
        'Dockerfile': 'dockerfile',
        '.gitignore': 'gitignore',
        'nginx.conf': 'nginx',
        '.prettierrc': 'json',
        '.eslintrc.json': 'json',
        'tailwind.config.js': 'javascript',
        'postcss.config.js': 'javascript',
        'vite.config.ts': 'typescript',
        'tsconfig.json': 'json',
        'tsconfig.node.json': 'json'
    }
    
    if file_name in special_lang_map:
        return special_lang_map[file_name]
    
    # Check by extension
    _, ext = os.path.splitext(file_path)
    return extension_map.get(ext, 'text')

def get_component_category(relative_path):
    """
    Categorize files based on their location in the project structure.
    """
    path_str = str(relative_path).replace('\\', '/')
    
    if path_str.startswith('src/components'):
        return "React Components"
    elif path_str.startswith('src/pages'):
        return "Page Components"
    elif path_str.startswith('src/hooks'):
        return "Custom Hooks"
    elif path_str.startswith('src/store'):
        return "State Management"
    elif path_str.startswith('src/api'):
        return "API Layer"
    elif path_str.startswith('src/types'):
        return "TypeScript Types"
    elif path_str.startswith('src/utils'):
        return "Utilities"
    elif path_str.startswith('src/routes'):
        return "Routing"
    elif path_str.startswith('src/styles'):
        return "Styles"
    elif path_str.startswith('public'):
        return "Public Assets"
    else:
        return "Configuration"

def compile_frontend_documentation(root_dir, output_file='frontend_documentation.md'):
    """
    Compile all frontend code into a single markdown file.
    
    Args:
        root_dir: The root directory of the frontend project
        output_file: The output markdown file name
    """
    root_path = Path(root_dir)
    
    # Create the markdown content
    markdown_content = []
    
    # Add header
    markdown_content.append("# Frontend Project Documentation\n")
    markdown_content.append(f"**Generated on:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    markdown_content.append(f"**Project Type:** React + TypeScript + Vite\n")
    markdown_content.append(f"**Project Root:** `{root_dir}`\n")
    markdown_content.append("\n---\n\n")
    
    # Collect all files
    all_files = []
    for root, dirs, files in os.walk(root_path):
        # Remove excluded directories from traversal
        dirs[:] = [d for d in dirs if d not in ['node_modules', 'dist', '.git', 'coverage', '.next']]
        
        for file in files:
            file_path = Path(root) / file
            if should_include_file(file_path):
                relative_path = file_path.relative_to(root_path)
                all_files.append((file_path, relative_path))
    
    # Sort files by category and then by path
    all_files.sort(key=lambda x: (get_component_category(x[1]), str(x[1])))
    
    # Add project structure overview
    markdown_content.append("## Project Structure Overview\n\n")
    categories = {}
    for _, relative_path in all_files:
        category = get_component_category(relative_path)
        if category not in categories:
            categories[category] = []
        categories[category].append(relative_path)
    
    for category, files in categories.items():
        markdown_content.append(f"- **{category}**: {len(files)} files\n")
    markdown_content.append("\n---\n\n")
    
    # Add table of contents
    markdown_content.append("## Table of Contents\n\n")
    
    current_category = None
    for _, relative_path in all_files:
        category = get_component_category(relative_path)
        
        # Add category header if changed
        if category != current_category:
            current_category = category
            markdown_content.append(f"\n### {category}\n")
        
        # Add file to TOC
        anchor = str(relative_path).replace('/', '-').replace('\\', '-').replace('.', '').lower()
        indent = "  " * (str(relative_path).count('/') - 1)
        markdown_content.append(f"{indent}- [{relative_path.name}](#{anchor})\n")
    
    markdown_content.append("\n---\n\n")
    
    # Add file contents
    markdown_content.append("## File Contents\n\n")
    
    current_category = None
    stats = {
        'total_lines': 0,
        'file_types': {}
    }
    
    for file_path, relative_path in all_files:
        category = get_component_category(relative_path)
        
        # Add category section if changed
        if category != current_category:
            current_category = category
            markdown_content.append(f"## 📂 {category}\n\n")
        
        # Add file content
        anchor = str(relative_path).replace('/', '-').replace('\\', '-').replace('.', '').lower()
        file_icon = "📄"
        
        # Choose appropriate icon based on file type
        if relative_path.suffix == '.tsx':
            file_icon = "⚛️"
        elif relative_path.suffix == '.ts':
            file_icon = "📘"
        elif relative_path.suffix == '.css':
            file_icon = "🎨"
        elif relative_path.suffix == '.json':
            file_icon = "📋"
        elif relative_path.suffix == '.html':
            file_icon = "🌐"
        elif relative_path.name == 'Dockerfile':
            file_icon = "🐳"
        
        markdown_content.append(f"### {file_icon} {relative_path.name}\n")
        markdown_content.append(f"**Path:** `{relative_path}`\n")
        
        # Add component description for key files
        if 'components' in str(relative_path):
            markdown_content.append(f"**Component Type:** {category}\n")
        
        markdown_content.append("\n")
        
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                line_count = len(content.splitlines())
                stats['total_lines'] += line_count
                
                # Track file types
                ext = relative_path.suffix or relative_path.name
                stats['file_types'][ext] = stats['file_types'].get(ext, 0) + 1
            
            # Get language for syntax highlighting
            language = get_language_for_file(str(file_path))
            
            # Add code block with line count
            markdown_content.append(f"<details>\n")
            markdown_content.append(f"<summary>View Code ({line_count} lines)</summary>\n\n")
            markdown_content.append(f"```{language}\n")
            markdown_content.append(content)
            if not content.endswith('\n'):
                markdown_content.append('\n')
            markdown_content.append("```\n")
            markdown_content.append("</details>\n\n")
            
        except Exception as e:
            markdown_content.append(f"❌ **Error reading file:** {e}\n\n")
        
        markdown_content.append("---\n\n")
    
    # Add summary statistics
    markdown_content.append("## 📊 Project Statistics\n\n")
    markdown_content.append(f"**Total files documented:** {len(all_files)}\n")
    markdown_content.append(f"**Total lines of code:** {stats['total_lines']:,}\n\n")
    
    # Files by type
    markdown_content.append("### Files by Type\n\n")
    markdown_content.append("| File Type | Count | Percentage |\n")
    markdown_content.append("|-----------|-------|------------|\n")
    
    total_files = len(all_files)
    for ext, count in sorted(stats['file_types'].items(), key=lambda x: x[1], reverse=True):
        percentage = (count / total_files) * 100
        markdown_content.append(f"| {ext} | {count} | {percentage:.1f}% |\n")
    
    # Component breakdown
    markdown_content.append("\n### Component Breakdown\n\n")
    for category, files in categories.items():
        markdown_content.append(f"- **{category}**: {len(files)} files\n")
        
        # Show first 5 files as examples
        for i, file in enumerate(files[:5]):
            markdown_content.append(f"  - `{file.name}`\n")
        if len(files) > 5:
            markdown_content.append(f"  - _...and {len(files) - 5} more_\n")
    
    markdown_content.append("\n---\n")
    markdown_content.append(f"\n*Documentation generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*")
    markdown_content.append(f"\n*Total documentation size: ~{len(''.join(markdown_content)) / 1024:.0f} KB*")
    
    # Write to file
    output_path = Path(output_file)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(''.join(markdown_content))
    
    print(f"✅ Frontend documentation successfully generated: {output_path.absolute()}")
    print(f"📊 Total files documented: {len(all_files)}")
    print(f"📄 Output file size: {output_path.stat().st_size / 1024:.2f} KB")
    print(f"📈 Total lines of code: {stats['total_lines']:,}")
    
    # Show breakdown
    print("\n📂 Component Breakdown:")
    for category, files in categories.items():
        print(f"  - {category}: {len(files)} files")

def main():
    # Set the root directory of your frontend project
    frontend_root = r"D:\NexusNao\CLIENTS\BAKAR\frontend"
    
    # Set the output file path
    output_file = "frontend_documentation.md"
    
    # You can also specify an absolute path for the output
    # output_file = r"D:\NexusNao\CLIENTS\BAKAR\frontend_documentation.md"
    
    # Run the documentation compiler
    compile_frontend_documentation(frontend_root, output_file)

if __name__ == "__main__":
    main()
