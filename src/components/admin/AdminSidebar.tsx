import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Utensils,
  Tags,
  CalendarRange,
  MapPin,
  BarChart3,
  Menu,
  X,
} from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin',
  },
  {
    label: 'Orders',
    icon: ShoppingBag,
    path: '/admin/orders',
  },
  {
    label: 'Menu Items',
    icon: Utensils,
    path: '/admin/menu',
  },
  {
    label: 'Menu Orders',
    icon: BarChart3,
    path: '/admin/menu-orders',
  },
  {
    label: 'Categories',
    icon: Tags,
    path: '/admin/categories',
  },
  {
    label: 'Meal Plans',
    icon: CalendarRange,
    path: '/admin/meal-plans',
  },
  {
    label: 'Delivery Zones',
    icon: MapPin,
    path: '/admin/delivery-zones',
  },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [isDesktopExpanded] = useState(true);

  const renderNavItems = (
    withLabels: boolean,
    options?: { onNavigate?: () => void; dense?: boolean }
  ) => (
    <nav
      className={clsx(
        'flex-1 space-y-1',
        options?.dense ? '' : 'mt-2'
      )}
    >
      {NAV_ITEMS.filter((item) => !item.hidden).map((item) => {
        const Icon = item.icon;
        const isActive =
          location.pathname === item.path ||
          (item.path !== '/admin' &&
            location.pathname.startsWith(`${item.path}/`));

        return (
          <Link
            key={item.path}
            to={item.path}
            title={item.label}
            onClick={options?.onNavigate}
            className={clsx(
              'group flex items-center rounded-2xl transition-all duration-200 border border-transparent',
              withLabels
                ? 'px-4 py-3 mx-1 space-x-3'
                : 'justify-center px-0 py-3 mx-1',
              isActive
                ? 'bg-white/15 text-white shadow-lg shadow-primary/30 border-white/10'
                : 'text-white/80 hover:bg-white/10 hover:text-white hover:border-white/10'
            )}
          >
            <span
              className={clsx(
                'h-9 w-9 inline-flex items-center justify-center rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/80 group-hover:bg-white/15'
              )}
            >
              <Icon size={18} />
            </span>
            {withLabels && (
              <span className="text-sm font-semibold whitespace-nowrap tracking-wide">
                {item.label}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  const toggleMobile = () => setIsMobileExpanded((prev) => !prev);
  const closeMobile = () => setIsMobileExpanded(false);

  const MobileMenuIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      {[8, 12, 16].map((y) => (
        <line
          key={y}
          x1="5.5"
          x2="18.5"
          y1={y}
          y2={y}
          stroke="#f97316"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );

  return (
    <>
      {/* Mobile floating rail */}
      <div className="sm:hidden fixed left-4 top-[5.25rem] z-40">
        <div
          className={clsx(
            'bg-gradient-to-b from-primary to-primary/80 text-white shadow-2xl rounded-3xl flex flex-col items-stretch transition-all duration-300 overflow-hidden ring-1 ring-white/20',
            isMobileExpanded ? 'w-64 px-4 py-4' : 'w-16 px-2 py-4'
          )}
        >
          <button
            type="button"
          className="inline-flex items-center justify-center rounded-full bg-white text-primary h-12 w-12 shadow-lg shadow-primary/30 self-center p-0 border-0"
          onClick={toggleMobile}
          aria-label={isMobileExpanded ? 'Close admin menu' : 'Open admin menu'}
        >
            {isMobileExpanded ? <X size={18} className="text-primary" /> : <MobileMenuIcon />}
          </button>
          <div
          className={clsx(
            'mt-4 flex-1 transition-all duration-300',
            isMobileExpanded
                ? 'opacity-100 max-h-[70vh]'
                : 'opacity-0 max-h-0 pointer-events-none'
          )}
        >
          {renderNavItems(true, {
            onNavigate: closeMobile,
            dense: true,
            })}
          </div>
        </div>
      </div>

      {/* Desktop rail */}
      <aside className="hidden sm:flex fixed left-0 top-20 z-30 h-[calc(100vh-5rem)]">
        <div
          className={clsx(
            'flex flex-col h-full w-64 bg-gradient-to-b from-primary via-primary to-[#f97316] text-white shadow-2xl rounded-tr-3xl rounded-br-3xl overflow-hidden py-6 ring-1 ring-primary/20'
          )}
        >
          <div
            className={clsx(
              'flex items-center justify-between px-4 pb-6 border-b border-white/10'
            )}
          >
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/60 font-semibold">
                Admin Console
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                Control Center
              </p>
            </div>
          </div>

          {renderNavItems(true)}

          <div
            className={clsx(
              'px-4 pt-4 mt-auto text-xs text-white/70 space-y-2 transition-all duration-200'
            )}
          >
            <p className="uppercase tracking-[0.2em] text-white/50 font-semibold">
              Quick tip
            </p>
            <p className="leading-relaxed">
              Use the shortcuts to hop between orders, menus, plans, and zones without leaving your flow.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
