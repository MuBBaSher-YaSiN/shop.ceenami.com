// components/forms/LeadForm.jsx
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useSubmitLeadMutation } from "../../features/lead/leadApiSlice";
import { toast } from "react-toastify";

export default function LeadForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitLead, { isLoading }] = useSubmitLeadMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitLead(form).unwrap();
      toast.success("Your info has been submitted!");
      setForm({ name: "", email: "", phone: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 space-y-4 text-white"
    >
      <Input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <Input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <Input
        name="phone"
        type="tel"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
