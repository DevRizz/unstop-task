import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, PencilLine, Camera, Mail, Phone, MapPin, X, Check } from 'lucide-react'

interface UserProfile {
  name: string
  email: string
  address: string
  phone: string
  avatar?: string
}

interface InputFieldProps {
  label: string
  name: string
  type: string
  value: string
  avatar?: string
  icon: React.ElementType
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, value, icon: Icon, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        className={`appearance-none border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${error ? 'border-red-500' : 'border-gray-300'
          }`}
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
    {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
  </div>
)

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    address: '',
    phone: '',
    avatar: '/placeholder-avatar.png'
  })
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProfile({
        name: 'Shiba Sharma',
        email: 'shiba25@gmail.com',
        address: 'Shop No. 42, Fashion Street, Colaba, Mumbai - 400001',
        phone: '+91 98765 43210',
      })
      setIsLoading(false)
    }
    fetchProfile()
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!profile.name.trim()) newErrors.name = 'Name is required'
    if (!profile.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(profile.email)) newErrors.email = 'Email is invalid'
    if (!profile.phone.trim()) newErrors.phone = 'Phone is required'
    if (!profile.address.trim()) newErrors.address = 'Address is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center"
              >
                <i className="fas fa-user-circle text-6xl text-gray-400" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </motion.div>
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="opacity-90">{profile.email}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.form
                key="edit-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <InputField
                  label="Name"
                  name="name"
                  type="text"
                  value={profile.name}
                  onChange={handleInputChange}
                  icon={User}
                  error={errors.name}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  icon={Mail}
                  error={errors.email}
                />
                <InputField
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleInputChange}
                  icon={Phone}
                  error={errors.phone}
                />
                <InputField
                  label="Address"
                  name="address"
                  type="text"
                  value={profile.address}
                  onChange={handleInputChange}
                  icon={MapPin}
                  error={errors.address}
                />

                <div className="flex justify-end space-x-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsEditing(false)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Saving...
                      </div>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="view-mode"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: Phone, label: 'Phone', value: profile.phone },
                    { icon: MapPin, label: 'Address', value: profile.address },
                    { icon: Mail, label: 'Email', value: profile.email }
                  ].map((item) => (
                    <div key={item.label} className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50">
                      <item.icon className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">{item.label}</p>
                        <p className="text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => setIsEditing(true)}
                >
                  <PencilLine className="h-4 w-4 mr-2" />
                  Edit Profile
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfilePage