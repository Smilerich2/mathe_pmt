'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Erklaerung() {
  const [selectedExample, setSelectedExample] = useState<'basic' | 'multi' | 'reverse' | null>(null)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Einheiten-Umrechner
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              ← Startseite
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Längeneinheiten - Theorie
            </h1>
            <p className="text-gray-600">
              Grundlagen der metrischen Längenumrechnung
            </p>
          </div>

          {/* Unit Scale */}
          <div className="bg-white border border-gray-300 rounded-lg mb-8">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">Einheiten-Reihenfolge</h2>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4">
                <div className="font-mono text-center text-lg mb-2">
                  km → hm → dam → m → dm → cm → mm → μm
                </div>
                <div className="text-center text-sm text-gray-600">
                  Kilometer → Hektometer → Dekameter → Meter → Dezimeter → Zentimeter → Millimeter → Mikrometer
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-300 rounded p-4">
                  <h3 className="font-bold mb-2">Nach rechts (kleinere Einheit)</h3>
                  <div className="text-sm space-y-1">
                    <div>• Multiplizieren (×)</div>
                    <div>• Faktor: ×10</div>
                    <div>• Ausnahme: mm → μm = ×1000</div>
                  </div>
                </div>
                <div className="border border-gray-300 rounded p-4">
                  <h3 className="font-bold mb-2">Nach links (größere Einheit)</h3>
                  <div className="text-sm space-y-1">
                    <div>• Dividieren (÷)</div>
                    <div>• Faktor: ÷10</div>
                    <div>• Ausnahme: μm → mm = ÷1000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white border border-gray-300 rounded-lg mb-8">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">Rechenbeispiele</h2>
            </div>
            <div className="p-6">

              {!selectedExample && (
                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setSelectedExample('basic')}
                    className="border border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 p-6 rounded text-left transition-colors"
                  >
                    <h3 className="font-bold mb-2">Einfacher Schritt</h3>
                    <p className="text-sm text-gray-600">Beispiel: m → cm</p>
                  </button>
                  <button
                    onClick={() => setSelectedExample('multi')}
                    className="border border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 p-6 rounded text-left transition-colors"
                  >
                    <h3 className="font-bold mb-2">Mehrere Schritte</h3>
                    <p className="text-sm text-gray-600">Beispiel: m → mm</p>
                  </button>
                  <button
                    onClick={() => setSelectedExample('reverse')}
                    className="border border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 p-6 rounded text-left transition-colors"
                  >
                    <h3 className="font-bold mb-2">Rückwärts</h3>
                    <p className="text-sm text-gray-600">Beispiel: mm → m</p>
                  </button>
                </div>
              )}

              {selectedExample === 'basic' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Einfacher Schritt: 5 m → cm</h3>
                    <button
                      onClick={() => setSelectedExample(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Zurück
                    </button>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-4 space-y-3">
                    <div><strong>Gegeben:</strong> 5 m</div>
                    <div><strong>Gesucht:</strong> ? cm</div>
                    <div><strong>Schritt 1:</strong> Position in der Reihe finden: m → cm (2 Schritte nach rechts)</div>
                    <div><strong>Schritt 2:</strong> Nach rechts = multiplizieren</div>
                    <div><strong>Schritt 3:</strong> 2 Schritte = ×10 × ×10 = ×100</div>
                    <div><strong>Rechnung:</strong> 5 × 100 = 500</div>
                    <div className="border-t border-gray-300 pt-3"><strong>Ergebnis:</strong> 5 m = 500 cm</div>
                  </div>
                </div>
              )}

              {selectedExample === 'multi' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Mehrere Schritte: 3 m → mm</h3>
                    <button
                      onClick={() => setSelectedExample(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Zurück
                    </button>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-4 space-y-3">
                    <div><strong>Gegeben:</strong> 3 m</div>
                    <div><strong>Gesucht:</strong> ? mm</div>
                    <div><strong>Schritt 1:</strong> Position in der Reihe finden: m → mm (3 Schritte nach rechts)</div>
                    <div><strong>Schritt 2:</strong> Nach rechts = multiplizieren</div>
                    <div><strong>Schritt 3:</strong> 3 Schritte = ×10 × ×10 × ×10 = ×1000</div>
                    <div><strong>Rechnung:</strong> 3 × 1000 = 3000</div>
                    <div className="border-t border-gray-300 pt-3"><strong>Ergebnis:</strong> 3 m = 3000 mm</div>
                  </div>
                </div>
              )}

              {selectedExample === 'reverse' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Rückwärts: 2500 mm → m</h3>
                    <button
                      onClick={() => setSelectedExample(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Zurück
                    </button>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-4 space-y-3">
                    <div><strong>Gegeben:</strong> 2500 mm</div>
                    <div><strong>Gesucht:</strong> ? m</div>
                    <div><strong>Schritt 1:</strong> Position in der Reihe finden: mm → m (3 Schritte nach links)</div>
                    <div><strong>Schritt 2:</strong> Nach links = dividieren</div>
                    <div><strong>Schritt 3:</strong> 3 Schritte = ÷10 ÷ ÷10 ÷ ÷10 = ÷1000</div>
                    <div><strong>Rechnung:</strong> 2500 ÷ 1000 = 2,5</div>
                    <div className="border-t border-gray-300 pt-3"><strong>Ergebnis:</strong> 2500 mm = 2,5 m</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Conversion Table */}
          <div className="bg-white border border-gray-300 rounded-lg mb-8">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">Umrechnungstabelle</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold mb-3">Häufige Umrechnungen</h3>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>1 m =</span>
                      <span>10 dm</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>1 m =</span>
                      <span>100 cm</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>1 m =</span>
                      <span>1000 mm</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>1 cm =</span>
                      <span>10 mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 mm =</span>
                      <span>1000 μm</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-3">Umrechnungsfaktoren</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>1 Schritt nach rechts:</span>
                      <span>× 10</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>2 Schritte nach rechts:</span>
                      <span>× 100</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>3 Schritte nach rechts:</span>
                      <span>× 1000</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>mm → μm (Sonderfall):</span>
                      <span>× 1000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4">
            <Link
              href="/uebung"
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded font-medium transition-colors"
            >
              Zu den Übungen
            </Link>
            <Link
              href="/"
              className="border border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 px-6 py-3 rounded font-medium transition-colors"
            >
              Zur Startseite
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}