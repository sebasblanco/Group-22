
"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";



const formSchema = z
    .object({
        riotUserName: z.string()
    })

export default function AccountForm() {
    const router = useRouter();
    router.refresh();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

            riotUserName: "",
        },
    });


    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch('/api/auth/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error('The email address is already in use.');

            } else {
                const data = await response.json();
                console.log(data);
                // Handle successful sign-up (e.g., redirect to a different page)
                toast.success('Sign up successful!');
                // Add pause to allow toast to display
                await new Promise(resolve => setTimeout(resolve, 2000));
                router.push('/auth/login');
            }
        } catch (error) {
            console.error('There was an error!', error);
            toast.error('An unexpected error occurred.');
        }

    };

    return (
        <main className="flex flex-col items-center justify-between">
            <Toaster />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="max-w-md w-full flex flex-col gap-4"
                >
                    <FormField
                        control={form.control}
                        name="riotUserName"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Riot Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Username#Tag"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <Button type="submit" className="w-full text-white">
                        Submit
                    </Button>
                </form>
            </Form>
        </main>
    );
}

