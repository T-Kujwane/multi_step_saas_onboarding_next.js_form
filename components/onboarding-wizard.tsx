"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle } from "lucide-react"

export type OnboardingData = {
  firstName: string
  lastName: string
  email: string
  companyName: string
  companySize: string
  industry: string
  role: string
  useCase: string
  preferences: string[]
}

const initialData: OnboardingData = {
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  companySize: "",
  industry: "",
  role: "",
  useCase: "",
  preferences: [],
}

const preferenceOptions = [
  {
    id: "email-updates",
    label: "Email Updates",
    description: "Receive product updates and announcements",
  },
  {
    id: "feature-releases",
    label: "Feature Releases",
    description: "Be the first to know about new features",
  },
  {
    id: "tips-tutorials",
    label: "Tips & Tutorials",
    description: "Get helpful tips to make the most of our platform",
  },
  {
    id: "webinars",
    label: "Webinars & Events",
    description: "Invitations to webinars and virtual events",
  },
  {
    id: "case-studies",
    label: "Case Studies",
    description: "Learn how others are using our platform",
  },
]

export default function OnboardingWizard() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof OnboardingData, string>>>({})

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }))

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateStep = () => {
    const newErrors: Partial<Record<keyof OnboardingData, string>> = {}

    if (step === 1) {
      if (!data.firstName) newErrors.firstName = "First name is required"
      if (!data.lastName) newErrors.lastName = "Last name is required"
      if (!data.email) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        newErrors.email = "Email is invalid"
      }
    } else if (step === 2) {
      if (!data.companyName) newErrors.companyName = "Company name is required"
      if (!data.companySize) newErrors.companySize = "Company size is required"
      if (!data.industry) newErrors.industry = "Industry is required"
    } else if (step === 3) {
      if (!data.role) newErrors.role = "Role is required"
      if (!data.useCase) newErrors.useCase = "Use case is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    const isValid = validateStep()

    if (isValid && step < totalSteps) {
      setStep(step + 1)
      console.log(`Moving to step ${step + 1}`)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    const isValid = validateStep()

    if (isValid) {
      console.log("Submitting data:", data)
      setStep(totalSteps)
    }
  }

  const handlePreferenceToggle = (id: string) => {
    setData((prev) => {
      const newPreferences = [...prev.preferences]

      if (newPreferences.includes(id)) {
        return {
          ...prev,
          preferences: newPreferences.filter((item) => item !== id),
        }
      } else {
        return {
          ...prev,
          preferences: [...newPreferences, id],
        }
      }
    })
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>
              Step {step} of {totalSteps}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <p className="text-gray-500">Let's start with some basic information about you.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={data.firstName}
                    onChange={(e) => updateData("firstName", e.target.value)}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={data.lastName}
                    onChange={(e) => updateData("lastName", e.target.value)}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => updateData("email", e.target.value)}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Company Information */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Company Information</h2>
              <p className="text-gray-500">Tell us about your company so we can customize your experience.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={data.companyName}
                  onChange={(e) => updateData("companyName", e.target.value)}
                  placeholder="Acme Inc."
                />
                {errors.companyName && <p className="text-sm text-red-500">{errors.companyName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size</Label>
                <Select value={data.companySize} onValueChange={(value) => updateData("companySize", value)}>
                  <SelectTrigger id="companySize">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501+">501+ employees</SelectItem>
                  </SelectContent>
                </Select>
                {errors.companySize && <p className="text-sm text-red-500">{errors.companySize}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={data.industry} onValueChange={(value) => updateData("industry", value)}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.industry && <p className="text-sm text-red-500">{errors.industry}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Role & Use Case */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Your Role & Use Case</h2>
              <p className="text-gray-500">Help us understand how you'll be using our platform.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label>What is your role?</Label>
                <RadioGroup
                  value={data.role}
                  onValueChange={(value) => updateData("role", value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="executive" id="executive" />
                    <Label htmlFor="executive" className="cursor-pointer">
                      Executive
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="manager" id="manager" />
                    <Label htmlFor="manager" className="cursor-pointer">
                      Manager
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual" className="cursor-pointer">
                      Individual Contributor
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">
                      Other
                    </Label>
                  </div>
                </RadioGroup>
                {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="useCase">What will you primarily use our platform for?</Label>
                <Select value={data.useCase} onValueChange={(value) => updateData("useCase", value)}>
                  <SelectTrigger id="useCase">
                    <SelectValue placeholder="Select primary use case" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project-management">Project Management</SelectItem>
                    <SelectItem value="team-collaboration">Team Collaboration</SelectItem>
                    <SelectItem value="customer-management">Customer Management</SelectItem>
                    <SelectItem value="analytics">Analytics & Reporting</SelectItem>
                    <SelectItem value="automation">Process Automation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.useCase && <p className="text-sm text-red-500">{errors.useCase}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Preferences */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Preferences</h2>
              <p className="text-gray-500">Customize your experience and communication preferences.</p>
            </div>

            <div className="space-y-4">
              {preferenceOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-3 border rounded-md p-4">
                  <Checkbox
                    id={option.id}
                    checked={data.preferences.includes(option.id)}
                    onCheckedChange={() => handlePreferenceToggle(option.id)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor={option.id} className="font-medium cursor-pointer">
                      {option.label}
                    </Label>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Completion */}
        {step === 5 && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Setup Complete!</h2>
              <p className="text-gray-500">
                Thanks for providing your information, {data.firstName}. Your account is now ready to use.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-left">
              <h3 className="font-medium mb-2">Account Summary</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="font-medium">Name:</span> {data.firstName} {data.lastName}
                </li>
                <li>
                  <span className="font-medium">Email:</span> {data.email}
                </li>
                <li>
                  <span className="font-medium">Company:</span> {data.companyName}
                </li>
                <li>
                  <span className="font-medium">Company Size:</span> {data.companySize}
                </li>
                <li>
                  <span className="font-medium">Industry:</span> {data.industry}
                </li>
                <li>
                  <span className="font-medium">Role:</span> {data.role}
                </li>
                <li>
                  <span className="font-medium">Primary Use Case:</span> {data.useCase}
                </li>
              </ul>
            </div>

            <p className="text-sm text-gray-500">You can update these preferences anytime in your account settings.</p>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && step < totalSteps && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}

          {step === 1 && <div />}

          {step < totalSteps - 1 && (
            <Button onClick={handleNext} className="ml-auto">
              Next
            </Button>
          )}

          {step === totalSteps - 1 && (
            <Button onClick={handleSubmit} className="ml-auto">
              Complete Setup
            </Button>
          )}

          {step === totalSteps && (
            <Button onClick={() => (window.location.href = "/dashboard")} className="ml-auto">
              Go to Dashboard
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
