'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/navbar/Header'
import { courses, features } from '@/resources/data/landing-page'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Transformasi Belajar Anda Dimulai Di Sini
          </h1>
          <p className="text-lg text-muted-foreground">
            Platform pendidikan online terdepan yang membantu Anda mencapai potensi penuh dalam karier dan pengembangan diri.
          </p>
          <div className="flex space-x-4">
            <Button size="lg">Mulai Belajar</Button>
            <Button variant="outline" size="lg">Lihat Kursus</Button>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src="/images/hero.jpeg"
            alt="Education Illustration"
            width={500}
            height={500}
            priority
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mengapa Memilih Kami?</h2>
            <p className="text-muted-foreground">
              Kami menyediakan pengalaman belajar terbaik untuk mendukung perjalanan pendidikan Anda
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Kursus Populer</h2>
          <p className="text-muted-foreground">
            Pilih kursus yang sesuai dengan minat dan kebutuhan Anda
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="hover:scale-105 transition-transform duration-300"
            >
              <CardHeader className="flex flex-row items-center space-x-4">
                <course.icon className="w-10 h-10 text-primary" />
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{course.description}</p>
                <Button variant="link" className="pl-0 mt-4">
                  Lihat Detail
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Mulai Perjalanan Belajar Anda Hari Ini
          </h2>
          <p className="text-lg mb-8">
            Bergabunglah dengan ribuan siswa yang telah mengubah karier mereka
          </p>
          <div className="flex justify-center space-x-6">
            <Button size="lg">Gabung Sekarang</Button>
            <Button variant="outline" size="lg" className="text-primary">
              Lihat Kursus
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
