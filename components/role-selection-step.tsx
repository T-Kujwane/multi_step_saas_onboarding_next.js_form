"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { OnboardingData } from "../onboarding-wizard"

const schema = z.object({
  role: z.string().min(1, "Role is required"),
  useCase: z.string().min(1, "Use case is required"),
})

type RoleSelectionProps = {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  setIsValid: (isValid: boolean) => void
}

export function RoleSelectionStep({ data, updateData, setIsValid }: RoleSelectionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      role: data.role,
      useCase: data.useCase,
    },
    mode: "onChange",
  })

  // Watch for changes to update parent state
  const watchedFields = watch()

  useEffect(() => {
    // Only update parent state when form values actually change
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        updateData({
          role: value.role || "",
          useCase: value.useCase || "",
        })
        setIsValid(isValid)
      }
    })

    // Clean up subscription
    return () => subscription.unsubscribe()
  }, [watch, updateData, setIsValid, isValid])

  const handleRoleChange = (value: string) => {
    setValue("role", value)
    trigger("role")
  }

  const handleUseCaseChange = (value: string) => {
    setValue("useCase", value)
    trigger("useCase")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Your Role & Use Case</h2>
        <p className="text-gray-500">Help us understand how you'll be using our platform.</p>
      </div>

      <form className="space-y-6">
        <div className="space-y-4">
          <Label>What is your role?</Label>
          <RadioGroup defaultValue={data.role} onValueChange={handleRoleChange} className="grid grid-cols-2 gap-4">
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
          {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="useCase">What will you primarily use our platform for?</Label>
          <Select defaultValue={data.useCase} onValueChange={handleUseCaseChange}>
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
          {errors.useCase && <p className="text-sm text-red-500">{errors.useCase.message}</p>}
        </div>
      </form>
    </div>
  )
}
