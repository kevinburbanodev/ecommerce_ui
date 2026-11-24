import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CoffeeDetail } from '@/features/coffee/components/CoffeeDetail'
import { coffees, findCoffee } from '@/features/coffee/coffees'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return coffees.map((coffee) => ({ id: String(coffee.id) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const coffee = findCoffee(Number((await params).id))
  return coffee ? { title: `${coffee.region}: ${coffee.notes.es} | Café Remite (demo)`, description: coffee.description.es } : {}
}

export default async function ProductPage({ params }: Props) {
  const coffee = findCoffee(Number((await params).id))
  if (!coffee) notFound()

  return <CoffeeDetail key={coffee.id} coffee={coffee} />
}
