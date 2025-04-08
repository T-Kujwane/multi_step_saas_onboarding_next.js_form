"use client"

import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { OnboardingData } from "../onboarding-wizard"

type PreferencesProps = {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  setIsValid: (isValid: boolean) => void
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

export function PreferencesStep({ data, updateData, setIsValid }: PreferencesProps) {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(data.preferences || [])

  useEffect(() => {
    // We don't need to watch for changes here since we're
    // explicitly updating the state in the togglePreference function
    updateData({ preferences: selectedPreferences })
    // Always valid since preferences are optional
    setIsValid(true)

    // Only run this effect when selectedPreferences actually changes
  }, [selectedPreferences, updateData, setIsValid])

  const togglePreference = (id: string) => {
    setSelectedPreferences((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id)
      } else {
        return [...current, id]
      }
    })
  }

  return (
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
              checked={selectedPreferences.includes(option.id)}
              onCheckedChange={() => togglePreference(option.id)}
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
  )
}
