"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { OnboardingData } from "../onboarding-wizard"

const schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companySize: z.string().min(1, "Company size is required"),
  industry: z.string().min(1, "Industry is required"),
})

type CompanyInfoProps = {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  setIsValid: (isValid: boolean) => void
}

export function CompanyInfoStep({ data, updateData, setIsValid }: CompanyInfoProps) {
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
      companyName: data.companyName,
      companySize: data.companySize,
      industry: data.industry,
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
          companyName: value.companyName || "",
          companySize: value.companySize || "",
          industry: value.industry || "",
        })
        setIsValid(isValid)
      }
    })

    // Clean up subscription
    return () => subscription.unsubscribe()
  }, [watch, updateData, setIsValid, isValid])

  const handleSelectChange = (field: string, value: string) => {
    setValue(field as "companySize" | "industry", value)
    trigger(field as "companySize" | "industry")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Company Information</h2>
        <p className="text-gray-500">Tell us about your company so we can customize your experience.</p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" placeholder="Acme Inc." {...register("companyName")} />
          {errors.companyName && <p className="text-sm text-red-500">{errors.companyName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companySize">Company Size</Label>
          <Select defaultValue={data.companySize} onValueChange={(value) => handleSelectChange("companySize", value)}>
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
          {errors.companySize && <p className="text-sm text-red-500">{errors.companySize.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select defaultValue={data.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
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
          {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
        </div>
      </form>
    </div>
  )
}
