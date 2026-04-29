import { useState, type FC } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { useCart } from '@hooks/useCart';
import { useToast } from '@components/common/Toast';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // ✅ Get the return URL and check for pending cart item
  const from = location.state?.from || '/';
  const hasPendingCartItem = location.state?.pendingCartItem || false;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Add pending item to cart after successful login
  const addPendingItemToCart = async () => {
    const pendingItemStr = localStorage.getItem('bakars_pending_cart_item');
    if (pendingItemStr) {
      try {
        const pendingItem = JSON.parse(pendingItemStr);

        // Check if the item is not too old (24 hours)
        const itemDate = new Date(pendingItem.timestamp);
        const now = new Date();
        const hoursDiff =
          (now.getTime() - itemDate.getTime()) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          await addToCart(
            pendingItem.item,
            pendingItem.quantity,
            pendingItem.specialInstructions
          );
          showToast(`${pendingItem.item.name} added to cart!`, 'success');
        }

        // Clear the pending item
        localStorage.removeItem('bakars_pending_cart_item');
      } catch (error) {
        console.error('Failed to add pending item to cart:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      await login(formData);
      showToast('Login successful!', 'success');

      // ✅ Add pending cart item if exists
      if (hasPendingCartItem) {
        await addPendingItemToCart();
      }

      // ✅ Navigate to the intended page or home
      navigate(from, { replace: true });
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Login failed';
      showToast(errorMessage, 'error');
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-heading text-4xl font-bold text-text mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-600">Sign in to your account to continue</p>

        {/* ✅ Show info if there's a pending cart item */}
        {hasPendingCartItem && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800">
              Login to add your selected item to cart
            </p>
          </div>
        )}
        {/* Show info if redirected from a protected page */}
        {from !== '/' && from !== '/login' && !hasPendingCartItem && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              Please login to access that page
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
            {errors.general}
          </div>
        )}

        <Input
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          leftIcon={<Mail size={20} />}
          error={errors.email}
          required
        />

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Enter your password"
            leftIcon={<Lock size={20} />}
            error={errors.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[42px] text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-gray-600">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-primary hover:text-primary-600 font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <Link
            to="/register"
            state={{ from: from, pendingCartItem: hasPendingCartItem }}
            className="text-primary hover:text-primary-600 font-semibold"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
