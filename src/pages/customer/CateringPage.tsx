import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  ChefHat,
  Award,
  Heart,
  Sparkles,
  Send,
  Calendar,
  Building2,
  Cake,
  Church,
  UsersRound,
  PartyPopper,
  GraduationCap,
} from 'lucide-react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Card from '@/components/common/Card';
import { useToast } from '@/components/common/Toast';
import apiClient from '@/api/client';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const CateringPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    // Phone validation (Australian format)
    const phoneRegex = /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      showToast('Please enter a valid Australian phone number', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      await apiClient.post('/contact', formData);

      showToast(
        "Thank you! Your catering enquiry has been sent successfully. We'll get back to you within 24 hours!",
        'success'
      );

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error: any) {
      console.error('Contact form error:', error);
      showToast(
        error.response?.data?.message ||
          'Failed to send message. Please try again.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const packages = [
    {
      name: 'Basic Package',
      price: '$25',
      perPerson: 'per head',
      features: [
        'Served altogether in buffet',
        'Starter: choose any 1 starter from main menu',
        'Main course: choose any 2 main course items from main menu',
        'Others: Afghani naan, raita & salad included',
      ],
      color: 'from-blue-500 to-blue-600',
      icon: <ChefHat className="w-8 h-8" />,
    },
    {
      name: 'Premium Package',
      price: '$33',
      perPerson: 'per head',
      features: [
        'Served altogether in buffet',
        'Starter: choose any 1 starter from main menu',
        'Main course: choose any 3 main course items from main menu',
        'Others: Afghani naan, raita & salad included',
      ],
      color: 'from-orange-500 to-orange-600',
      icon: <Award className="w-8 h-8" />,
      popular: true,
    },
    {
      name: 'Diamond Package',
      price: '$40',
      perPerson: 'per head',
      features: [
        'Served altogether in buffet',
        'Starter: choose any 2 starters from main menu',
        'Main course: choose any 3 main course items from main menu',
        'Others: Afghani naan, raita & salad included',
        'Dessert: choose any 1 dessert from main menu',
      ],
      color: 'from-purple-500 to-purple-600',
      icon: <Sparkles className="w-8 h-8" />,
    },
  ];

  const features = [
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: 'Any Event Size',
      description:
        'From intimate gatherings of 10 to grand celebrations of 500+',
    },
    {
      icon: <Heart className="w-12 h-12 text-primary" />,
      title: '100% Halal',
      description:
        'All our ingredients are halal-certified for your peace of mind',
    },
    {
      icon: <Clock className="w-12 h-12 text-primary" />,
      title: 'Fresh & On-Time',
      description:
        'Prepared fresh on the day and delivered right when you need it',
    },
    {
      icon: <Award className="w-12 h-12 text-primary" />,
      title: 'Award-Winning',
      description: 'Authentic Pakistani & Indian cuisine loved by thousands',
    },
  ];

  const eventTypes = [
    {
      name: 'Weddings',
      icon: <Heart className="w-12 h-12" />,
      color: 'text-pink-500',
    },
    {
      name: 'Corporate Events',
      icon: <Building2 className="w-12 h-12" />,
      color: 'text-blue-600',
    },
    {
      name: 'Birthday Parties',
      icon: <Cake className="w-12 h-12" />,
      color: 'text-purple-500',
    },
    {
      name: 'Religious Ceremonies',
      icon: <Church className="w-12 h-12" />,
      color: 'text-indigo-600',
    },
    {
      name: 'Family Gatherings',
      icon: <UsersRound className="w-12 h-12" />,
      color: 'text-green-600',
    },
    {
      name: 'Community Events',
      icon: <PartyPopper className="w-12 h-12" />,
      color: 'text-orange-500',
    },
    {
      name: 'Engagement Parties',
      icon: <Heart className="w-12 h-12" />,
      color: 'text-rose-500',
    },
    {
      name: 'Graduation Parties',
      icon: <GraduationCap className="w-12 h-12" />,
      color: 'text-teal-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section with Background Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-primary to-orange-600 overflow-hidden py-12 sm:py-16 min-h-[520px] sm:min-h-[580px] lg:min-h-[640px]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 107, 53, 0.9), rgba(255, 107, 53, 0.85)), url('https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply',
        }}
      >
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] bg-repeat"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex items-center">
          <div className="max-w-3xl text-white text-center md:text-left space-y-6">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                Catering Services
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-6 text-white/95 drop-shadow-md">
                Exceptional Pakistani & Indian cuisine for your special events
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg">
                <div className="flex items-center backdrop-blur-sm bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>100% Halal</span>
                </div>
                <div className="flex items-center backdrop-blur-sm bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Fresh Ingredients</span>
                </div>
                <div className="flex items-center backdrop-blur-sm bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Authentic Flavours</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-auto"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#F9FAFB"
            />
          </svg>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-bold text-text mb-4">
              Why Choose Bakar's Catering?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We bring authentic flavours and professional service to make your
              event unforgettable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-8 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-xl text-text mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-bold text-text mb-4">
              Our Catering Packages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our curated packages or let us create a custom menu
              for your event
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <Card
                  className={`p-8 h-full flex flex-col ${
                    pkg.popular
                      ? 'border-2 border-orange-500 shadow-2xl transform scale-105'
                      : 'shadow-lg'
                  } hover:shadow-xl transition-all duration-300`}
                >
                  <div
                    className={`bg-gradient-to-r ${pkg.color} text-white rounded-2xl p-6 mb-6 text-center`}
                  >
                    <div className="flex justify-center mb-4">{pkg.icon}</div>
                    <h3 className="font-heading text-2xl font-bold mb-2">
                      {pkg.name}
                    </h3>
                    <div className="text-4xl font-bold">{pkg.price}</div>
                    <div className="text-sm opacity-90">{pkg.perPerson}</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={pkg.popular ? 'primary' : 'outline'}
                    fullWidth
                    className="mt-auto"
                    onClick={() => {
                      const formElement =
                        document.getElementById('contact-form');
                      formElement?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Enquire Now
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <motion.div
              className="flex justify-center mb-6"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Button
                variant="primary"
                size="lg"
                className="px-10 py-4 text-lg shadow-lg shadow-primary/30 hover:shadow-xl"
                onClick={() =>
                  window.open(
                    "/files/Bakar's Menu_20251024_170454_0000.pdf",
                    '_blank'
                  )
                }
              >
                View Menu
              </Button>
            </motion.div>

            <Card className="bg-gradient-to-r from-primary/5 to-orange-500/5 p-8 max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-4">
                <strong>Minimum Order:</strong> 10 guests |{' '}
                <strong>Delivery Fee:</strong> Calculated based on distance
              </p>
              <p className="text-gray-600">
                All packages can be customized to suit your preferences and
                dietary requirements
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl font-bold text-text mb-4">
              Get Your Custom Quote
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours
              with a tailored proposal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 h-full bg-gradient-to-br from-primary to-orange-600 text-white">
                <h3 className="font-heading text-2xl font-bold mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Call Us</h4>
                      <p className="text-white/90">
                        Speak with our catering team
                      </p>
                      <a
                        href="tel:+61 480 573 034"
                        className="text-white font-semibold hover:underline"
                      >
                        +61 480 573 034
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-white/90">Send us your requirements</p>
                      <a
                        href="mailto:bakarsfoods@gmail.com"
                        className="text-white font-semibold hover:underline"
                      >
                        bakarsfoods@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Location</h4>
                      <p className="text-white/90">
                        504-508 Woodville Rd
                        <br />
                        Guildford, NSW 2161
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Response Time</h4>
                      <p className="text-white/90">
                        We respond to all enquiries within
                        <br />
                        24 hours on business days
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Booking Notice
                  </h4>
                  <p className="text-sm text-white/90">
                    We recommend booking at least 7 days in advance for events.
                    For urgent requests, please call us directly.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />

                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0X XXXX XXXX"
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Event Details & Requirements
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Please include:
• Event type (wedding, corporate, birthday, etc.)
• Date and time
• Expected number of guests
• Venue location
• Package preference or custom requirements
• Any dietary requirements or preferences"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="lg"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    By submitting this form, you agree to our{' '}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Types Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl font-bold text-text mb-4">
              Perfect For Every Occasion
            </h2>
            <p className="text-lg text-gray-600">
              We cater to all types of events, big or small
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {eventTypes.map((event, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div
                    className={`flex justify-center mb-3 ${event.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {event.icon}
                  </div>
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors duration-300">
                    {event.name}
                  </h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-orange-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl font-bold mb-6">
              Ready to Make Your Event Memorable?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Let us handle the food while you enjoy the celebration
            </p>
            <Button
              variant="ghost"
              size="lg"
              className="bg-white text-primary hover:bg-white/90 hover:text-primary shadow-lg"
              onClick={() => {
                const formElement = document.getElementById('contact-form');
                formElement?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Your Free Quote
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CateringPage;
