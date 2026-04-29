import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import Card from '@/components/common/Card';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useToast } from '@/components/common/Toast';
import apiClient from '@/api/client';

const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiClient.post('/contact', formData);
      showToast(
        'Message sent successfully! We will contact you soon.',
        'success'
      );
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Failed to send contact message', error);
      showToast('Failed to send message. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Background with Image and Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80')`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-primary-50" />

        {/* Decorative Circles */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] bg-repeat" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-5xl font-bold text-text mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600">
              Get in touch with Bakar's Food & Catering
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 shadow-2xl backdrop-blur-sm bg-white/95 border-2 border-primary/10">
                <h2 className="font-heading text-3xl font-bold mb-6 text-text flex items-center">
                  <Send className="mr-3 text-primary" size={28} />
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    type="text"
                    label="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-white"
                  />

                  <Input
                    type="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-white"
                  />

                  <Input
                    type="tel"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="bg-white"
                  />

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-300"
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="lg"
                    isLoading={isSubmitting}
                    className="transform hover:scale-105 transition-transform duration-300"
                  >
                    <Send size={20} className="mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Address Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="p-8 shadow-xl backdrop-blur-sm bg-white/95 border-2 border-primary/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-gradient-to-br from-primary to-orange-600 rounded-full">
                      <MapPin className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-text mb-2">
                        Address
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        504-508 Woodville Rd
                        <br />
                        Guildford, NSW 2161
                        <br />
                        Sydney, Australia
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Phone Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="p-8 shadow-xl backdrop-blur-sm bg-white/95 border-2 border-primary/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full">
                      <Phone className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-text mb-2">
                        Phone
                      </h3>
                      <a
                        href="tel:+61XXXXXXXXX"
                        className="text-primary hover:text-primary-600 text-lg font-semibold transition-colors duration-300"
                      >
                        +61 480 573 034
                      </a>
                      <p className="text-gray-600 mt-1">
                        Call us for enquiries
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Email Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="p-8 shadow-xl backdrop-blur-sm bg-white/95 border-2 border-primary/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full">
                      <Mail className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-text mb-2">
                        Email
                      </h3>
                      <a
                        href="mailto:bakarsfoods@gmail.com"
                        className="text-primary hover:text-primary-600 text-lg font-semibold transition-colors duration-300 break-all"
                      >
                        bakarsfoods@gmail.com
                      </a>
                      <p className="text-gray-600 mt-1">Send us an email</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Business Hours Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="p-8 shadow-xl backdrop-blur-sm bg-gradient-to-br from-primary to-orange-600 text-white border-2 border-primary/20">
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                      <Clock className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-2xl font-bold mb-4">
                        Business Hours
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">
                            Monday - Sunday:
                          </span>
                          <span className="font-bold text-lg">
                            11:00 AM - 9:00 PM
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <p className="text-white/90 text-sm">
                          We're open 7 days a week to serve you the best
                          Pakistani & Indian cuisine
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Map Section (Optional) */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12"
          >
            <Card className="p-6 shadow-xl backdrop-blur-sm bg-white/95 border-2 border-primary/10">
              <h3 className="font-heading text-2xl font-bold text-text mb-4">
                Find Us On Map
              </h3>
              <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  title="Bakar's Food Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.8!2d150.9948!3d-33.8558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDUxJzIwLjkiUyAxNTDCsDU5JzQxLjMiRQ!5e0!3m2!1sen!2sau!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
