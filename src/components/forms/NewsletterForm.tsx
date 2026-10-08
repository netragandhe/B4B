import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid business email address'),
})

type NewsletterData = z.infer<typeof newsletterSchema>

export const NewsletterForm: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = (data: NewsletterData) => {
    toast({
      title: 'Subscribed to Small Business Intelligence',
      description: `Weekly capital rates and operational playbooks will be delivered to ${data.email}.`,
      type: 'success',
    })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-2 text-left ${className}`}>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Input
            type="email"
            placeholder="Enter your business email..."
            error={errors.email?.message}
            leftIcon={<Mail className="w-4 h-4" />}
            {...register('email')}
            className="h-10 text-xs bg-slate-900/60 text-white placeholder:text-slate-400 border-slate-700"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="shrink-0 text-xs"
        >
          Subscribe
        </Button>
      </div>
      {errors.email && (
        <p className="text-[11px] text-red-400 animate-fadeIn">{errors.email.message}</p>
      )}
    </form>
  )
}
