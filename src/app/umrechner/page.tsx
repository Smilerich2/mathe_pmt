'use client'

import Link from 'next/link'
import { useState } from 'react'

type UnitType = 'length' | 'area'

interface Unit {
  name: string
  factor: number
  displayName: string
}

const lengthUnits: Unit[] = [
  { name: 'km', factor: 1000000000, displayName: 'Kilometer (km)' },
  { name: 'hm', factor: 100000000, displayName: 'Hektometer (hm)' },
  { name: 'dam', factor: 10000000, displayName: 'Dekameter (dam)' },
  { name: 'm', factor: 1000000, displayName: 'Meter (m)' },
  { name: 'dm', factor: 100000, displayName: 'Dezimeter (dm)' },
  { name: 'cm', factor: 10000, displayName: 'Zentimeter (cm)' },
  { name: 'mm', factor: 1000, displayName: 'Millimeter (mm)' },
  { name: 'μm', factor: 1, displayName: 'Mikrometer (μm)' }
]

const areaUnits: Unit[] = [
  { name: 'km²', factor: 1000000000000, displayName: 'Quadratkilometer (km²)' },
  { name: 'hm²', factor: 10000000000, displayName: 'Quadrathektometer (hm²)' },
  { name: 'dam²', factor: 100000000, displayName: 'Quadratdekameter (dam²)' },
  { name: 'm²', factor: 1000000, displayName: 'Quadratmeter (m²)' },
  { name: 'dm²', factor: 10000, displayName: 'Quadratdezimeter (dm²)' },
  { name: 'cm²', factor: 100, displayName: 'Quadratzentimeter (cm²)' },
  { name: 'mm²', factor: 1, displayName: 'Quadratmillimeter (mm²)' }
]

export default function Umrechner() {
  const [unitType, setUnitType] = useState<UnitType>('length')
  const [fromUnit, setFromUnit] = useState('m')
  const [toUnit, setToUnit] = useState('cm')
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [calculationPath, setCalculationPath] = useState<string[]>([])

  const getCurrentUnits = () => {
    return unitType === 'length' ? lengthUnits : areaUnits
  }

  const findUnit = (unitName: string) => {
    return getCurrentUnits().find(u => u.name === unitName)
  }

  const getCalculationPath = (from: Unit, to: Unit, value: number) => {
    const fromIndex = getCurrentUnits().findIndex(u => u.name === from.name)
    const toIndex = getCurrentUnits().findIndex(u => u.name === to.name)

    if (fromIndex === -1 || toIndex === -1) return []

    const path: string[] = []
    const stepDifference = Math.abs(toIndex - fromIndex)

    if (fromIndex === toIndex) {
      path.push(`${value} ${from.name} = ${value} ${to.name}`)
      return path
    }

    // Special case for length: mm ↔ μm
    if (unitType === 'length' &&
        ((from.name === 'mm' && to.name === 'μm') ||
         (from.name === 'μm' && to.name === 'mm'))) {

      if (from.name === 'mm') {
        path.push(`Schritt: mm → μm (Sonderfall: ×1000)`)
        path.push(`${value} × 1000 = ${value * 1000}`)
      } else {
        path.push(`Schritt: μm → mm (Sonderfall: ÷1000)`)
        path.push(`${value} ÷ 1000 = ${value / 1000}`)
      }
      return path
    }

    const direction = fromIndex < toIndex ? 'rechts' : 'links'
    const stepFactor = unitType === 'length' ? 10 : 100
    const operation = direction === 'rechts' ? '×' : '÷'

    // Show step-by-step path
    if (stepDifference === 1) {
      path.push(`Schritt: ${from.name} → ${to.name} (1 Schritt nach ${direction})`)
      path.push(`${operation}${stepFactor}`)
    } else {
      path.push(`Schritt: ${from.name} → ${to.name} (${stepDifference} Schritte nach ${direction})`)

      // Calculate total factor
      const totalFactor = Math.pow(stepFactor, stepDifference)
      const factorSteps = Array(stepDifference).fill(`${operation}${stepFactor}`).join(' ')

      path.push(`${factorSteps} = ${operation}${totalFactor}`)
    }

    // Calculate result
    const finalResult = (value * from.factor) / to.factor
    path.push(`${value} ${operation}${Math.pow(stepFactor, stepDifference)} = ${finalResult}`)

    return path
  }

  const handleConvert = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult(null)
      setCalculationPath([])
      return
    }

    const value = Number(inputValue)
    const fromUnitObj = findUnit(fromUnit)
    const toUnitObj = findUnit(toUnit)

    if (!fromUnitObj || !toUnitObj) return

    const convertedValue = (value * fromUnitObj.factor) / toUnitObj.factor
    setResult(convertedValue)

    const path = getCalculationPath(fromUnitObj, toUnitObj, value)
    setCalculationPath(path)
  }

  const handleUnitTypeChange = (newType: UnitType) => {
    setUnitType(newType)
    if (newType === 'length') {
      setFromUnit('m')
      setToUnit('cm')
    } else {
      setFromUnit('m²')
      setToUnit('cm²')
    }
    setResult(null)
    setCalculationPath([])
  }

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
              Einheiten-Umrechner
            </h1>
            <p className="text-gray-600">
              Praktisches Tool zur Umrechnung mit detailliertem Rechenweg
            </p>
          </div>

          {/* Unit Type Selection */}
          <div className="bg-white border border-gray-300 rounded-lg mb-8">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">Einheitentyp wählen</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleUnitTypeChange('length')}
                  className={`p-4 rounded border-2 transition-colors ${
                    unitType === 'length'
                      ? 'border-gray-800 bg-gray-800 text-white'
                      : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <h3 className="font-bold mb-2">Längeneinheiten</h3>
                  <p className="text-sm opacity-75">km, m, cm, mm, μm</p>
                </button>
                <button
                  onClick={() => handleUnitTypeChange('area')}
                  className={`p-4 rounded border-2 transition-colors ${
                    unitType === 'area'
                      ? 'border-gray-800 bg-gray-800 text-white'
                      : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <h3 className="font-bold mb-2">Flächeneinheiten</h3>
                  <p className="text-sm opacity-75">km², m², cm², mm²</p>
                </button>
              </div>
            </div>
          </div>

          {/* Converter */}
          <div className="bg-white border border-gray-300 rounded-lg mb-8">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">Umrechnung</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-4 gap-4 items-end">

                {/* Input Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wert eingeben
                  </label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:border-gray-500 focus:outline-none text-lg font-mono"
                  />
                </div>

                {/* From Unit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Von
                  </label>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                  >
                    {getCurrentUnits().map(unit => (
                      <option key={unit.name} value={unit.name}>
                        {unit.displayName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* To Unit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nach
                  </label>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                  >
                    {getCurrentUnits().map(unit => (
                      <option key={unit.name} value={unit.name}>
                        {unit.displayName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Convert Button */}
                <div>
                  <button
                    onClick={handleConvert}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded font-medium transition-colors"
                  >
                    Umrechnen
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          {result !== null && (
            <div className="bg-white border border-gray-300 rounded-lg mb-8">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900">Ergebnis</h2>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 border border-gray-200 rounded p-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800 mb-2 font-mono">
                      {inputValue} {fromUnit} = {result} {toUnit}
                    </div>
                  </div>
                </div>

                {/* Calculation Path */}
                {calculationPath.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Rechenweg</h3>
                    <div className="bg-gray-50 border border-gray-200 rounded p-4">
                      <div className="space-y-2">
                        {calculationPath.map((step, index) => (
                          <div key={index} className="font-mono text-sm">
                            <span className="text-gray-600">{index + 1}.</span>
                            <span className="ml-2">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Reference */}
          <div className="bg-white border border-gray-300 rounded-lg">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">Schnellreferenz</h2>
            </div>
            <div className="p-6">
              {unitType === 'length' ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-3">Längeneinheiten - Regeln</h3>
                    <div className="space-y-2 text-sm">
                      <div>• Nach rechts (kleinere Einheit): ×10</div>
                      <div>• Nach links (größere Einheit): ÷10</div>
                      <div>• Sonderfall mm ↔ μm: ×1000 / ÷1000</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3">Häufige Umrechnungen</h3>
                    <div className="space-y-1 text-sm font-mono">
                      <div>1 m = 10 dm = 100 cm = 1000 mm</div>
                      <div>1 km = 1000 m</div>
                      <div>1 mm = 1000 μm</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-3">Flächeneinheiten - Regeln</h3>
                    <div className="space-y-2 text-sm">
                      <div>• Nach rechts (kleinere Einheit): ×100</div>
                      <div>• Nach links (größere Einheit): ÷100</div>
                      <div>• Grund: Fläche = Länge × Länge</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3">Häufige Umrechnungen</h3>
                    <div className="space-y-1 text-sm font-mono">
                      <div>1 m² = 100 dm² = 10.000 cm²</div>
                      <div>1 km² = 1.000.000 m²</div>
                      <div>1 cm² = 100 mm²</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}