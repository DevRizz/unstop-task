import React, { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, PinIcon, Youtube, CreditCard, ShoppingCart, Mail, ArrowRight, MapPin, Phone } from 'lucide-react'

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/mytalorzone', color: 'hover:bg-blue-600' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/mytalorzone', color: 'hover:bg-sky-500' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/mytalorzone', color: 'hover:bg-pink-500' },
  { name: 'Pinterest', icon: PinIcon, href: 'https://pinterest.com/mytalorzone', color: 'hover:bg-red-600' },
  { name: 'Youtube', icon: Youtube, href: 'https://youtube.com/mytalorzone', color: 'hover:bg-red-500' }
]

const quickLinks = [
  { name: 'Home', to: '/' },
  { name: 'Traditional', to: '/category/traditional' },
  { name: 'Western', to: '/category/western' },
  { name: 'Trendy', to: '/category/trendy' }
]

const customerService = [
  { name: 'Contact Us', to: '/contact' },
  { name: 'FAQ', to: '/faq' },
  { name: 'Shipping Information', to: '/shipping' },
  { name: 'Returns & Exchanges', to: '/returns' }
]

const contactInfo = [
  { icon: MapPin, text: 'Corporate Office: 123, Sahiba Tower, MG Road, Bangalore - 560001' },
  { icon: Phone, text: '+91 1800 123 4567 (Toll Free)' },
  { icon: Mail, text: 'contact@mytalorzone.com' }
]

const paymentMethods = [
  { name: 'visa', icon: 'fa-brands fa-cc-visa', color: 'hover:text-blue-500' },
  { name: 'mastercard', icon: 'fa-brands fa-cc-mastercard', color: 'hover:text-orange-500' },
  { name: 'amex', icon: 'fa-brands fa-cc-amex', color: 'hover:text-blue-400' },
  { name: 'paypal', icon: 'fa-brands fa-paypal', color: 'hover:text-blue-600' }
]

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setTimeout(() => setSubscribed(false), 3000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold">About Us</h3>
            <p className="text-gray-400 leading-relaxed">
              Mytalorzone by Sahiba is your premier destination for fashion excellence.
              We blend traditional craftsmanship with modern style to create unique pieces
              that define your personality.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-colors duration-300 ${social.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold">Customer Service</h3>
            <ul className="space-y-2">
              {customerService.map((service) => (
                <motion.li key={service.name} whileHover={{ x: 5 }}>
                  <Link
                    to={service.to}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    {service.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold">Stay Updated</h3>
            <p className="text-gray-400">Subscribe to our newsletter for exclusive offers and updates.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm"
                >
                  Thank you for subscribing!
                </motion.p>
              )}
            </form>
          </motion.div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 pb-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {contactInfo.map((info) => (
              <motion.div
                key={info.text}
                variants={itemVariants}
                className="flex items-center gap-3 text-gray-400"
              >
                <info.icon className="w-5 h-5" />
                <span>{info.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8"
        >
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <CreditCard className="w-8 h-8 text-gray-400" />
              <span className="text-gray-400">Payment Methods:</span>
            </div>
            {paymentMethods.map((payment) => (
              <motion.i
                key={payment.name}
                className={`${payment.icon} text-3xl text-gray-400 transition-colors duration-300 ${payment.color}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={payment.name}
              />
            ))}
            <ShoppingCart className="w-8 h-8 text-gray-400 hover:text-gray-200 transition-colors duration-300" />
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 text-center"
        >
          <motion.p variants={itemVariants} className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} धन्यवाद! Mytalorzone by Sahiba. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer