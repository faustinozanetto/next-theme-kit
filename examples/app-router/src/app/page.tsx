import { Example } from 'next-theme-kit'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center dark:text-neutral-50 bg-neutral-50 text-neutral-900 dark:bg-neutral-900'>
      <h1 className='text-5xl font-extrabold'>Next Theme Kit</h1>
      <h2 className='text-3xl font-medium'>App Router Example</h2>

      <Example />
    </main>
  )
}
