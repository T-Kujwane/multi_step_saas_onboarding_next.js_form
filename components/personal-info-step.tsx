"use client"

import type React from "react"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { OnboardingData } from "../onboarding-wizard"

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
})

type PersonalInfoProps = {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  setIsValid: (isValid: boolean) => void
}

export function PersonalInfoStep({ data, updateData, setIsValid }: PersonalInfoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    },
    mode: "onChange",
  })

  // Watch for changes to update parent state
  const watchedFields = watch()

  useEffect(() => {
    // Only update validation state based on form validity
    setIsValid(isValid)

    // Only run when isValid changes
  }, [isValid, setIsValid])

  // Handle form changes manually
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateData({ [name]: value } as Partial<OnboardingData>)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-gray-500">Let's start with some basic information about you.</p>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              defaultValue={data.firstName}
              onChange={handleFormChange}
              {...register("firstName")}
            />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              defaultValue={data.lastName}
              onChange={handleFormChange}
              {...register("lastName")}
            />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            defaultValue={data.email}
            onChange={handleFormChange}
            {...register("email")}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
      </form>
    </div>
  )
}
