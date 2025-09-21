'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function FlaechenErklaerung() {
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
              Flächeneinheiten - Theorie
            </h1>
            <p className="text-gray-600">
              Grundlagen der metrischen Flächenumrechnung
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
                  km² → hm² → dam² → m² → dm² → cm² → mm²
                </div>
                <div className="text-center text-sm text-gray-600">
                  Quadratkilometer → Quadrathektometer → Quadratdekameter → Quadratmeter → Quadratdezimeter → Quadratzentimeter → Quadratmillimeter
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-300 rounded p-4">
                  <h3 className="font-bold mb-2">Nach rechts (kleinere Einheit)</h3>
                  <div className="text-sm space-y-1">
                    <div>• Multiplizieren (×)</div>
                    <div>• Faktor: ×100</div>
                    <div>• Grund: Fläche = Länge × Länge</div>
                  </div>
                </div>
                <div className="border border-gray-300 rounded p-4">
                  <h3 className="font-bold mb-2">Nach links (größere Einheit)</h3>
                  <div className="text-sm space-y-1">
                    <div>• Dividieren (÷)</div>
                    <div>• Faktor: ÷100</div>
                    <div>• Grund: Umkehrung der Multiplikation</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-4">
                <h4 className="font-bold text-gray-800 mb-2">Wichtiger Unterschied zu Längen:</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <div>• Längen: 1 Schritt = ×10 oder ÷10</div>
                  <div>• Flächen: 1 Schritt = ×100 oder ÷100</div>
                  <div>• Begründung: 1 m² = (10 dm) × (10 dm) = 100 dm²</div>
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
                    <p className="text-sm text-gray-600">Beispiel: m² → dm²</p>
                  </button>
                  <button
                    onClick={() => setSelectedExample('multi')}
                    className="border border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 p-6 rounded text-left transition-colors"
                  >
                    <h3 className="font-bold mb-2">Mehrere Schritte</h3>
                    <p className="text-sm text-gray-600">Beispiel: m² → cm²</p>
                  </button>
                  <button
                    onClick={() => setSelectedExample('reverse')}
                    className="border border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 p-6 rounded text-left transition-colors"
                  >
                    <h3 className="font-bold mb-2">Rückwärts</h3>
                    <p className="text-sm text-gray-600">Beispiel: cm² → m²</p>
                  </button>
                </div>
              )}

              {selectedExample === 'basic' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Einfacher Schritt: 4 m² → dm²</h3>
                    <button
                      onClick={() => setSelectedExample(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Zurück
                    </button>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-4 space-y-3">
                    <div><strong>Gegeben:</strong> 4 m²</div>
                    <div><strong>Gesucht:</strong> ? dm²</div>
                    <div><strong>Schritt 1:</strong> Position in der Reihe finden: m² → dm² (1 Schritt nach rechts)</div>
                    <div><strong>Schritt 2:</strong> Nach rechts = multiplizieren mit 100</div>
                    <div><strong>Schritt 3:</strong> 1 Schritt = ×100</div>
                    <div><strong>Rechnung:</strong> 4 × 100 = 400</div>
                    <div className="border-t border-gray-300 pt-3"><strong>Ergebnis:</strong> 4 m² = 400 dm²</div>
                  </div>
                </div>
              )}

              {selectedExample === 'multi' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Mehrere Schritte: 2 m² → cm²</h3>
                    <button
                      onClick={() => setSelectedExample(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Zurück
                    </button>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-4 space-y-3">
                    <div><strong>Gegeben:</strong> 2 m²</div>
                    <div><strong>Gesucht:</strong> ? cm²</div>
                    <div><strong>Schritt 1:</strong> Position in der Reihe finden: m² → cm² (2 Schritte nach rechts)</div>
                    <div><strong>Schritt 2:</strong> Nach rechts = multiplizieren</div>
                    <div><strong>Schritt 3:</strong> 2 Schritte = ×100 × ×100 = ×10.000</div>
                    <div><strong>Rechnung:</strong> 2 × 10.000 = 20.000</div>
                    <div className="border-t border-gray-300 pt-3"><strong>Ergebnis:</strong> 2 m² = 20.000 cm²</div>
                  </div>
                </div>
              )}

              {selectedExample === 'reverse' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Rückwärts: 50.000 cm² → m²</h3>
                    <button
                      onClick={() => setSelectedExample(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Zurück
                    </button>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-4 space-y-3">
                    <div><strong>Gegeben:</strong> 50.000 cm²</div>
                    <div><strong>Gesucht:</strong> ? m²</div>
                    <div><strong>Schritt 1:</strong> Position in der Reihe finden: cm² → m² (2 Schritte nach links)</div>
                    <div><strong>Schritt 2:</strong> Nach links = dividieren</div>
                    <div><strong>Schritt 3:</strong> 2 Schritte = ÷100 ÷ ÷100 = ÷10.000</div>
                    <div><strong>Rechnung:</strong> 50.000 ÷ 10.000 = 5</div>
                    <div className="border-t border-gray-300 pt-3"><strong>Ergebnis:</strong> 50.000 cm² = 5 m²</div>
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
                      <span>1 m² =</span>
                      <span>100 dm²</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>1 m² =</span>
                      <span>10.000 cm²</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>1 m² =</span>
                      <span>1.000.000 mm²</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>1 dm² =</span>
                      <span>100 cm²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 cm² =</span>
                      <span>100 mm²</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-3">Umrechnungsfaktoren</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>1 Schritt nach rechts:</span>
                      <span>× 100</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>2 Schritte nach rechts:</span>
                      <span>× 10.000</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>3 Schritte nach rechts:</span>
                      <span>× 1.000.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Entsprechend nach links:</span>
                      <span>÷ 100, ÷ 10.000, ...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Explanation */}
          <div className="bg-white border border-gray-300 rounded-lg mb-8">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">Warum ×100 statt ×10?</h2>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 border border-gray-200 rounded p-4">
                <h3 className="font-bold mb-3">Beispiel: 1 m² in dm²</h3>
                <div className="space-y-2 text-sm">
                  <div>• 1 m = 10 dm (Länge)</div>
                  <div>• 1 m² = 1 m × 1 m = 10 dm × 10 dm = 100 dm² (Fläche)</div>
                  <div>• Daher: Bei Flächen wird aus ×10 → ×100</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4">
            <Link
              href="/flaechen/uebung"
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