import { NextResponse } from "next/server"

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO & Founder",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team-member-1-IfSBodyc5DwPCkjKwPQN3T34Fn75OU.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "CTO",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team-member-2-IfSBodyc5DwPCkjKwPQN3T34Fn75OU.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Head of Operations",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team-member-3-IfSBodyc5DwPCkjKwPQN3T34Fn75OU.jpg",
  },
  {
    id: 4,
    name: "Sarah Lee",
    role: "Head of Customer Experience",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team-member-4-IfSBodyc5DwPCkjKwPQN3T34Fn75OU.jpg",
  },
  {
    id: 5,
    name: "David Brown",
    role: "Lead Developer",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team-member-5-IfSBodyc5DwPCkjKwPQN3T34Fn75OU.jpg",
  },
  {
    id: 6,
    name: "Emily Chen",
    role: "Marketing Director",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team-member-6-IfSBodyc5DwPCkjKwPQN3T34Fn75OU.jpg",
  },
]

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return NextResponse.json(teamMembers)
}

