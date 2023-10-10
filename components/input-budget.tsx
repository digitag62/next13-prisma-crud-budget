"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/navigation";

const categoryOptions = [
  "FOOD",
  "TRANSPORT",
  "HOUSING",
  "ENTERTAINMENT",
  "DEBT",
  "SAVINGS",
  "WELLNESS",
];

const formSchema = z.object({
  comment: z.string().min(1, { message: "Comment is required" }),
  category: z.enum([
    "FOOD",
    "TRANSPORT",
    "HOUSING",
    "ENTERTAINMENT",
    "DEBT",
    "SAVINGS",
    "WELLNESS",
  ]),
  dateExpense: z.date({ required_error: "A date of birth is required." }),
  amount: z.coerce.number({ required_error: "Amount is required" }),
});

export const InputBudget = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
      category: "FOOD",
      dateExpense: new Date(),
      amount: 0,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post("/api/submit", values)
      form.reset();
      console.log(res)
    } catch (error) {
      console.log(error)
    }finally {
			router.refresh();
		}
  };

  return (
    <div className="py-10">
      <h2 className="font-semibold py-3">Make a new budget!</h2>
      <Form {...form}>
        <form
          className="grid gap-2 grid-cols-12"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="comment"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormControl>
                  <Input
                    placeholder="Makan nasi lemak"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="category"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="dateExpense"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={isLoading}
                        variant={"outline"}
                        className={cn(
                          "w-full text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          moment(field.value).format("DD/MM/YYYY")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            name="amount"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormControl>
                  <Input
                    placeholder="Amount"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="w-full col-span-12"
            disabled={isLoading}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
