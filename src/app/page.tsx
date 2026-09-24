import { Hero } from '@/components/Hero'
import { Intro } from '@/components/Intro'
import { Work } from '@/components/Work'
import { Experience } from '@/components/Experience'
import { Stack } from '@/components/Stack'
import { Contact } from '@/components/Contact'
import { PageTransition } from '@/components/PageTransition'

export default function Home() {
  return (
    <PageTransition>
      <main id="main">
        <Hero />
        <Intro />
        <Work />
        <Experience />
        <Stack />
        <Contact />
      </main>
    </PageTransition>
  )
}
