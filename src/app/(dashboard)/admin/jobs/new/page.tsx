"use client";
/* eslint-disable */


import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateJob } from "@/services/queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

const jobSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  company_id: z.string().min(1, { message: "Company ID is required" }),
  recruiter_id: z.string().min(1, { message: "Recruiter ID is required" }),
  status: z.enum(["OPEN", "CLOSED", "DRAFT"]),
  pipeline_stages: z.string().min(1, { message: "Enter comma separated stages" }),
  salary_range: z.string().min(1, { message: "Salary range is required" }),
});

export default function CreateJobPage() {
  const router = useRouter();
  const createJob = useCreateJob();
  
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      company_id: "",
      recruiter_id: "",
      status: "OPEN",
      pipeline_stages: "Screening, Tech Round, HR Interview, Offer",
      salary_range: "",
    },
  });

  async function onSubmit(values: z.infer<typeof jobSchema>) {
    try {
      await createJob.mutateAsync({
        ...values,
        pipeline_stages: values.pipeline_stages.split(",").map((s) => s.trim()),
      });
      toast.success("Job listing created successfully!");
      router.push("/jobs");
    } catch (error: any) {
      toast.error("Failed to create job.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/jobs">
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-border/50">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Job Listing</h1>
          <p className="text-muted-foreground mt-1">Publish a new job opportunity to the platform.</p>
        </div>
      </div>

      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>Fill in the details for the new job listing.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Senior React Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company ID</FormLabel>
                      <FormControl>
                        <Input placeholder="60c72b2f..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="recruiter_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recruiter ID</FormLabel>
                      <FormControl>
                        <Input placeholder="60c72b2f..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="salary_range"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Range</FormLabel>
                      <FormControl>
                        <Input placeholder="₹12,00,000 - ₹18,00,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="OPEN">Open</SelectItem>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="CLOSED">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pipeline_stages"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Pipeline Stages (Comma separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="Screening, Tech Round, Offer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the role, responsibilities, and requirements..." 
                          className="min-h-[150px] resize-y"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end pt-4 border-t border-border/50">
                <Button type="submit" size="lg" disabled={createJob.isPending} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {createJob.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {createJob.isPending ? "Publishing..." : "Publish Job"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
