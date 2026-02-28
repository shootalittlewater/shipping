"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChildInfo {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  allergies: string;
  emergencyContact: string;
  emergencyPhone: string;
  pickupStop: string;
  dropoffStop: string;
  specialNeeds: string;
}

export default function ParentSurveyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Parent Information
    parentFirstName: "",
    parentLastName: "",
    email: "",
    phone: "",
    secondaryPhone: "",
    preferredLanguage: "English",
    
    // Address (for billing/contact only)
    address: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Preferences
    notificationMethod: [] as string[],
    notificationTiming: "both",
    textAlerts: true,
    emailAlerts: true,
    
    // School Information
    schoolCode: "",
    schoolName: "",
    
    // Terms
    agreedToTerms: false,
    agreedToPrivacy: false,
  });

  const [children, setChildren] = useState<ChildInfo[]>([
    {
      id: "1",
      firstName: "",
      lastName: "",
      grade: "",
      allergies: "",
      emergencyContact: "",
      emergencyPhone: "",
      pickupStop: "",
      dropoffStop: "",
      specialNeeds: "",
    },
  ]);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const totalSteps = 5;

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateChild = (id: string, field: keyof ChildInfo, value: string) => {
    setChildren((prev) =>
      prev.map((child) => (child.id === id ? { ...child, [field]: value } : child))
    );
  };

  const addChild = () => {
    setChildren((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        firstName: "",
        lastName: "",
        grade: "",
        allergies: "",
        emergencyContact: "",
        emergencyPhone: "",
        pickupStop: "",
        dropoffStop: "",
        specialNeeds: "",
      },
    ]);
  };

  const removeChild = (id: string) => {
    if (children.length > 1) {
      setChildren((prev) => prev.filter((child) => child.id !== id));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would submit the form data to your backend
    console.log("Form Data:", formData);
    console.log("Children:", children);
    setShowSuccessDialog(true);
  };

  const toggleNotificationMethod = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      notificationMethod: prev.notificationMethod.includes(method)
        ? prev.notificationMethod.filter((m) => m !== method)
        : [...prev.notificationMethod, method],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">🚌</span>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Parent Registration
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Help us keep your children safe with accurate information
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex items-center ${step < totalSteps ? "flex-1" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step < currentStep
                      ? "bg-green-500 text-white"
                      : step === currentStep
                      ? "bg-blue-600 text-white scale-110"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step < currentStep ? "✓" : step}
                </div>
                {step < totalSteps && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                      step < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
            <span>Parent Info</span>
            <span>Children</span>
            <span>Stops</span>
            <span>Preferences</span>
            <span>Review</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-8">
          {/* Step 1: Parent Information */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                👤 Parent/Guardian Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.parentFirstName}
                    onChange={(e) => updateFormData("parentFirstName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="John"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.parentLastName}
                    onChange={(e) => updateFormData("parentLastName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Primary Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Secondary Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.secondaryPhone}
                    onChange={(e) => updateFormData("secondaryPhone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="(555) 987-6543"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Preferred Language
                  </label>
                  <select
                    value={formData.preferredLanguage}
                    onChange={(e) => updateFormData("preferredLanguage", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>Mandarin</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Contact Address
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This is for contact purposes only. We do not track home addresses for student
                  pickups.
                </p>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Springfield"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => updateFormData("state", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="IL"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => updateFormData("zipCode", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="62701"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  School Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      School Code *
                    </label>
                    <input
                      type="text"
                      value={formData.schoolCode}
                      onChange={(e) => updateFormData("schoolCode", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="ABC123"
                      required
                    />
                    <p className="text-xs text-gray-500">Provided by your school district</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      School Name
                    </label>
                    <input
                      type="text"
                      value={formData.schoolName}
                      onChange={(e) => updateFormData("schoolName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Springfield Elementary"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Children Information */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  👶 Student Information
                </h2>
                <Button
                  onClick={addChild}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  + Add Another Child
                </Button>
              </div>

              {children.map((child, index) => (
                <div
                  key={child.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4 bg-gray-50 dark:bg-gray-700/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Child {index + 1}
                    </h3>
                    {children.length > 1 && (
                      <Button
                        variant="outline"
                        onClick={() => removeChild(child.id)}
                        className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={child.firstName}
                        onChange={(e) => updateChild(child.id, "firstName", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Emma"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={child.lastName}
                        onChange={(e) => updateChild(child.id, "lastName", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Doe"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Grade *
                      </label>
                      <select
                        value={child.grade}
                        onChange={(e) => updateChild(child.id, "grade", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      >
                        <option value="">Select Grade</option>
                        <option>Pre-K</option>
                        <option>Kindergarten</option>
                        <option>1st Grade</option>
                        <option>2nd Grade</option>
                        <option>3rd Grade</option>
                        <option>4th Grade</option>
                        <option>5th Grade</option>
                        <option>6th Grade</option>
                        <option>7th Grade</option>
                        <option>8th Grade</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Allergies/Medical Info
                      </label>
                      <input
                        type="text"
                        value={child.allergies}
                        onChange={(e) => updateChild(child.id, "allergies", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Peanut allergy, asthma, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        value={child.emergencyContact}
                        onChange={(e) =>
                          updateChild(child.id, "emergencyContact", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Grandparent, relative, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Emergency Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={child.emergencyPhone}
                        onChange={(e) => updateChild(child.id, "emergencyPhone", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Special Needs/Accommodations
                      </label>
                      <textarea
                        value={child.specialNeeds}
                        onChange={(e) => updateChild(child.id, "specialNeeds", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Any special accommodations the driver should be aware of..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Bus Stop Information */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                📍 Bus Stop Assignments
              </h2>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">ℹ️</span>
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Designated Stops Only
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      For privacy and safety, we only track designated bus stop locations, not home
                      addresses. Please select from your school's approved stop locations.
                    </p>
                  </div>
                </div>
              </div>

              {children.map((child, index) => (
                <div
                  key={child.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4 bg-gray-50 dark:bg-gray-700/50"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {child.firstName} {child.lastName} - Grade {child.grade}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Morning Pickup Stop *
                      </label>
                      <select
                        value={child.pickupStop}
                        onChange={(e) => updateChild(child.id, "pickupStop", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      >
                        <option value="">Select Pickup Stop</option>
                        <option>Stop 1 - Main St & Oak Ave</option>
                        <option>Stop 2 - Elm Street Corner</option>
                        <option>Stop 3 - Park View Plaza</option>
                        <option>Stop 4 - Community Center</option>
                        <option>Stop 5 - Maple Ridge</option>
                      </select>
                      <p className="text-xs text-gray-500">
                        Where your child will be picked up in the morning
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Afternoon Drop-off Stop *
                      </label>
                      <select
                        value={child.dropoffStop}
                        onChange={(e) => updateChild(child.id, "dropoffStop", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      >
                        <option value="">Select Drop-off Stop</option>
                        <option>Stop 1 - Main St & Oak Ave</option>
                        <option>Stop 2 - Elm Street Corner</option>
                        <option>Stop 3 - Park View Plaza</option>
                        <option>Stop 4 - Community Center</option>
                        <option>Stop 5 - Maple Ridge</option>
                        <option>Different - After School Care</option>
                      </select>
                      <p className="text-xs text-gray-500">
                        Where your child will be dropped off after school
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Notification Preferences */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                🔔 Notification Preferences
              </h2>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    How would you like to receive notifications?
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.textAlerts}
                        onChange={(e) => updateFormData("textAlerts", e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          📱 Text Messages (SMS)
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Instant notifications sent to {formData.phone || "your phone"}
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.emailAlerts}
                        onChange={(e) => updateFormData("emailAlerts", e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          📧 Email Notifications
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Detailed updates sent to {formData.email || "your email"}
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.notificationMethod.includes("push")}
                        onChange={() => toggleNotificationMethod("push")}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          🔔 Push Notifications
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Real-time alerts through the mjo mobile app
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    When should we notify you?
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="radio"
                        name="timing"
                        checked={formData.notificationTiming === "both"}
                        onChange={() => updateFormData("notificationTiming", "both")}
                        className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          Both Pickup and Drop-off
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Get notified for morning pickup and afternoon drop-off
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="radio"
                        name="timing"
                        checked={formData.notificationTiming === "pickup"}
                        onChange={() => updateFormData("notificationTiming", "pickup")}
                        className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          Pickup Only
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Only notify me when my child is picked up in the morning
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="radio"
                        name="timing"
                        checked={formData.notificationTiming === "dropoff"}
                        onChange={() => updateFormData("notificationTiming", "dropoff")}
                        className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          Drop-off Only
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Only notify me when my child is dropped off in the afternoon
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                        Recommended Settings
                      </h4>
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        We recommend enabling both text and push notifications for the most reliable
                        updates, especially for younger children.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review and Submit */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                ✅ Review Your Information
              </h2>

              <div className="space-y-4">
                {/* Parent Info Summary */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gray-50 dark:bg-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Parent Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Name:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formData.parentFirstName} {formData.parentLastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Email:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{formData.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{formData.phone}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">School:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formData.schoolName || formData.schoolCode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Children Summary */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gray-50 dark:bg-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Students ({children.length})
                  </h3>
                  {children.map((child, index) => (
                    <div
                      key={child.id}
                      className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-b-0 border-gray-200 dark:border-gray-600"
                    >
                      <p className="font-medium text-gray-900 dark:text-white mb-2">
                        {child.firstName} {child.lastName} - {child.grade}
                      </p>
                      <div className="text-sm space-y-1">
                        <p className="text-gray-600 dark:text-gray-400">
                          Pickup: {child.pickupStop || "Not selected"}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Drop-off: {child.dropoffStop || "Not selected"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notifications Summary */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gray-50 dark:bg-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Notification Preferences
                  </h3>
                  <div className="text-sm space-y-2">
                    <p className="text-gray-900 dark:text-white">
                      Methods:{" "}
                      {[
                        formData.textAlerts && "Text",
                        formData.emailAlerts && "Email",
                        formData.notificationMethod.includes("push") && "Push",
                      ]
                        .filter(Boolean)
                        .join(", ") || "None selected"}
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      Timing:{" "}
                      {formData.notificationTiming === "both"
                        ? "Pickup & Drop-off"
                        : formData.notificationTiming === "pickup"
                        ? "Pickup Only"
                        : "Drop-off Only"}
                    </p>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <label className="flex items-start gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.agreedToTerms}
                      onChange={(e) => updateFormData("agreedToTerms", e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600 mt-0.5"
                      required
                    />
                    <div className="flex-1 text-sm">
                      <span className="text-gray-900 dark:text-white">
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Terms of Service
                        </a>
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.agreedToPrivacy}
                      onChange={(e) => updateFormData("agreedToPrivacy", e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600 mt-0.5"
                      required
                    />
                    <div className="flex-1 text-sm">
                      <span className="text-gray-900 dark:text-white">
                        I have read and agree to the{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </a>{" "}
                        and understand that only designated stop locations will be tracked
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-700 mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-8"
            >
              ← Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8"
              >
                Next →
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.agreedToTerms || !formData.agreedToPrivacy}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8"
              >
                Submit Registration ✓
              </Button>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Need help? Contact us at{" "}
            <a href="mailto:support@mjo.com" className="text-blue-600 hover:underline">
              support@mjo.com
            </a>{" "}
            or call (555) 123-4567
          </p>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="text-center mb-4">
              <div className="text-6xl mb-4">🎉</div>
              <DialogTitle className="text-2xl">Registration Complete!</DialogTitle>
            </div>
            <DialogDescription className="text-center">
              Thank you for registering with mjo. You'll receive a confirmation email shortly with
              your login credentials and next steps.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                What's Next?
              </h4>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>✓ Check your email for account activation</li>
                <li>✓ Download the mjo mobile app</li>
                <li>✓ Complete your profile setup</li>
                <li>✓ Start receiving real-time updates!</li>
              </ul>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              onClick={() => setShowSuccessDialog(false)}
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}