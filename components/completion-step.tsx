import { CheckCircle } from "lucide-react"
import type { OnboardingData } from "../onboarding-wizard"

type CompletionProps = {
  data: OnboardingData
}

export function CompletionStep({ data }: CompletionProps) {
  return (
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
  )
}
