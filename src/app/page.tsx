'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Einheiten-Umrechner
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
                Startseite
              </Link>
              <Link href="/umrechner" className="text-gray-700 hover:text-gray-900 font-medium">
                Umrechner
              </Link>
              <div className="relative group">
                <span className="text-gray-700 cursor-pointer font-medium">Längen</span>
                <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <Link href="/erklaerung" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                    Theorie
                  </Link>
                  <Link href="/uebung" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                    Übungen
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <span className="text-gray-700 cursor-pointer font-medium">Flächen</span>
                <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <Link href="/flaechen/erklaerung" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                    Theorie
                  </Link>
                  <Link href="/flaechen/uebung" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                    Übungen
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200">
              <Link href="/" className="block py-3 text-gray-700 hover:text-gray-900 font-medium">
                Startseite
              </Link>
              <Link href="/umrechner" className="block py-3 text-gray-700 hover:text-gray-900 font-medium">
                Umrechner
              </Link>
              <div className="py-2">
                <div className="text-gray-700 font-medium mb-2">Längen</div>
                <Link href="/erklaerung" className="block pl-4 py-2 text-gray-600 hover:text-gray-800">
                  Theorie
                </Link>
                <Link href="/uebung" className="block pl-4 py-2 text-gray-600 hover:text-gray-800">
                  Übungen
                </Link>
              </div>
              <div className="py-2">
                <div className="text-gray-700 font-medium mb-2">Flächen</div>
                <Link href="/flaechen/erklaerung" className="block pl-4 py-2 text-gray-600 hover:text-gray-800">
                  Theorie
                </Link>
                <Link href="/flaechen/uebung" className="block pl-4 py-2 text-gray-600 hover:text-gray-800">
                  Übungen
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Metrische Einheiten
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Umrechnung von Längen- und Flächeneinheiten für handwerkliche Berufe
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">

            {/* Längeneinheiten */}
            <div className="bg-white border border-gray-300 rounded-lg">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900">Längeneinheiten</h2>
                <p className="text-sm text-gray-600">Meter, Zentimeter, Millimeter</p>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="font-mono">km → hm → dam → m → dm → cm → mm → μm</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Umrechnungsfaktor: ×10 / ÷10 (Ausnahme: mm ↔ μm = ×1000 / ÷1000)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/erklaerung"
                    className="border border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded text-center transition-colors"
                  >
                    <div className="font-medium text-gray-900">Theorie</div>
                    <div className="text-xs text-gray-600">Grundlagen lernen</div>
                  </Link>
                  <Link
                    href="/uebung"
                    className="border border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded text-center transition-colors"
                  >
                    <div className="font-medium text-gray-900">Übungen</div>
                    <div className="text-xs text-gray-600">Praxis trainieren</div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Flächeneinheiten */}
            <div className="bg-white border border-gray-300 rounded-lg">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900">Flächeneinheiten</h2>
                <p className="text-sm text-gray-600">Quadratmeter, Quadratzentimeter</p>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="font-mono">km² → hm² → dam² → m² → dm² → cm² → mm²</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Umrechnungsfaktor: ×100 / ÷100 (bei jedem Schritt)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/flaechen/erklaerung"
                    className="border border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded text-center transition-colors"
                  >
                    <div className="font-medium text-gray-900">Theorie</div>
                    <div className="text-xs text-gray-600">Grundlagen lernen</div>
                  </Link>
                  <Link
                    href="/flaechen/uebung"
                    className="border border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded text-center transition-colors"
                  >
                    <div className="font-medium text-gray-900">Übungen</div>
                    <div className="text-xs text-gray-600">Praxis trainieren</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="bg-white border border-gray-300 rounded-lg">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">Schnellübersicht</h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Häufige Längenumrechnungen</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between">
                      <span>1 m =</span>
                      <span>10 dm = 100 cm = 1000 mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 cm =</span>
                      <span>10 mm = 10.000 μm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 km =</span>
                      <span>1000 m = 100.000 cm</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Häufige Flächenumrechnungen</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between">
                      <span>1 m² =</span>
                      <span>100 dm² = 10.000 cm²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 cm² =</span>
                      <span>100 mm²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 km² =</span>
                      <span>1.000.000 m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}