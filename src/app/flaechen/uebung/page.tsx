'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Exercise {
  id: number
  question: string
  from: number
  fromUnit: string
  toUnit: string
  correctAnswer: number
  userAnswer: string
  isCorrect?: boolean
}

const areaUnits = [
  { name: 'km²', factor: 1000000000000 },
  { name: 'hm²', factor: 10000000000 },
  { name: 'dam²', factor: 100000000 },
  { name: 'm²', factor: 1000000 },
  { name: 'dm²', factor: 10000 },
  { name: 'cm²', factor: 100 },
  { name: 'mm²', factor: 1 }
]

export default function FlaechenUebung() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const generateExercise = (id: number): Exercise => {
    const fromUnitIndex = Math.floor(Math.random() * areaUnits.length)
    let toUnitIndex = Math.floor(Math.random() * areaUnits.length)

    while (toUnitIndex === fromUnitIndex) {
      toUnitIndex = Math.floor(Math.random() * areaUnits.length)
    }

    const fromUnit = areaUnits[fromUnitIndex]
    const toUnit = areaUnits[toUnitIndex]

    let fromValue: number
    const stepDifference = Math.abs(toUnitIndex - fromUnitIndex)

    // 70% chance for easy/medium exercises, 30% for challenging ones
    const isChallengingExercise = Math.random() < 0.3

    if (fromUnitIndex < toUnitIndex) {
      // Going from larger to smaller unit (multiply)
      if (stepDifference === 1) {
        // Single step: mix of whole numbers and decimals
        if (isChallengingExercise) {
          const decimals = [0.5, 1.5, 2.5, 3.5, 4.5, 0.25, 0.75, 1.25, 2.25]
          fromValue = decimals[Math.floor(Math.random() * decimals.length)]
        } else {
          fromValue = Math.floor(Math.random() * 9) + 1 // 1-9
        }
      } else if (stepDifference === 2) {
        // Two steps: mostly whole numbers
        if (isChallengingExercise) {
          const decimals = [0.5, 1.2, 2.8, 3.6, 0.25, 1.75]
          fromValue = decimals[Math.floor(Math.random() * decimals.length)]
        } else {
          fromValue = Math.floor(Math.random() * 5) + 1 // 1-5
        }
      } else if (stepDifference >= 3) {
        // Three+ steps: smaller values
        if (isChallengingExercise) {
          const decimals = [0.5, 1.2, 2.5, 0.25, 1.75]
          fromValue = decimals[Math.floor(Math.random() * decimals.length)]
        } else {
          fromValue = Math.floor(Math.random() * 3) + 1 // 1-3
        }
      }
    } else {
      // Going from smaller to larger unit (divide)
      if (stepDifference === 1) {
        // Single step: multiples of 100
        if (isChallengingExercise) {
          const values = [150, 250, 350, 450, 650, 750, 850, 950]
          fromValue = values[Math.floor(Math.random() * values.length)]
        } else {
          const multiplier = Math.floor(Math.random() * 9) + 1
          fromValue = multiplier * 100 // 100, 200, 300, etc.
        }
      } else if (stepDifference === 2) {
        // Two steps: multiples of 10000
        if (isChallengingExercise) {
          const values = [15000, 25000, 35000, 45000, 65000, 75000]
          fromValue = values[Math.floor(Math.random() * values.length)]
        } else {
          const multiplier = Math.floor(Math.random() * 9) + 1
          fromValue = multiplier * 10000 // 10000, 20000, etc.
        }
      } else if (stepDifference >= 3) {
        // Three+ steps: larger multiples
        if (isChallengingExercise) {
          const values = [1250000, 2750000, 3500000, 4250000]
          fromValue = values[Math.floor(Math.random() * values.length)]
        } else {
          const multiplier = Math.floor(Math.random() * 5) + 1
          fromValue = multiplier * 1000000 // 1000000, 2000000, etc.
        }
      }
    }

    const correctAnswer = (fromValue * fromUnit.factor) / toUnit.factor

    return {
      id,
      question: `Wie viele ${toUnit.name} sind ${fromValue} ${fromUnit.name}?`,
      from: fromValue,
      fromUnit: fromUnit.name,
      toUnit: toUnit.name,
      correctAnswer,
      userAnswer: ''
    }
  }

  const startNewGame = () => {
    const newExercises = Array.from({ length: 10 }, (_, i) => generateExercise(i + 1))
    setExercises(newExercises)
    setCurrentExercise(0)
    setUserAnswer('')
    setShowFeedback(false)
    setGameFinished(false)
    setScore({ correct: 0, total: 0 })
  }

  useEffect(() => {
    startNewGame()
  }, [])

  const submitAnswer = () => {
    if (!userAnswer.trim()) return

    const currentEx = exercises[currentExercise]
    const isCorrect = parseFloat(userAnswer) === currentEx.correctAnswer

    const updatedExercise = {
      ...currentEx,
      userAnswer,
      isCorrect
    }

    const updatedExercises = [...exercises]
    updatedExercises[currentExercise] = updatedExercise
    setExercises(updatedExercises)

    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }))

    setShowFeedback(true)
  }

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setUserAnswer('')
      setShowFeedback(false)
    } else {
      setGameFinished(true)
    }
  }

  const getScoreColor = () => {
    const percentage = (score.correct / score.total) * 100
    if (percentage >= 80) return 'text-green-700'
    if (percentage >= 60) return 'text-yellow-700'
    return 'text-red-700'
  }

  const getScoreMessage = () => {
    const percentage = (score.correct / score.total) * 100
    if (percentage >= 90) return 'Ausgezeichnet!'
    if (percentage >= 80) return 'Sehr gut!'
    if (percentage >= 70) return 'Gut gemacht!'
    if (percentage >= 60) return 'Nicht schlecht!'
    return 'Übe weiter!'
  }

  if (exercises.length === 0) {
    return <div>Lade Flächenübungen...</div>
  }

  if (gameFinished) {
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
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Flächenübung abgeschlossen</h1>

                <div className={`text-4xl font-bold mb-4 ${getScoreColor()}`}>
                  {score.correct} / {score.total}
                </div>

                <div className="text-xl text-gray-700 mb-6">
                  {getScoreMessage()}
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">Übersicht der Antworten</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto text-left">
                    {exercises.map((ex, index) => (
                      <div key={ex.id} className="flex justify-between items-center p-2 border-b border-gray-100">
                        <span className="text-sm">{index + 1}. {ex.from} {ex.fromUnit} → {ex.toUnit}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-mono">{ex.userAnswer}</span>
                          <span className={`text-lg ${ex.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {ex.isCorrect ? '✓' : '✗'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-x-4">
                  <button
                    onClick={startNewGame}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded font-medium transition-colors"
                  >
                    Neue Übung starten
                  </button>
                  <Link
                    href="/"
                    className="inline-block border border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 px-6 py-3 rounded font-medium transition-colors"
                  >
                    Zur Startseite
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentEx = exercises[currentExercise]

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
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Flächeneinheiten - Übungen</h1>
            <div className="text-gray-600">
              Aufgabe {currentExercise + 1} von {exercises.length} |
              Richtig: {score.correct} | Falsch: {score.total - score.correct}
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-8">
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded h-2 mb-4">
                <div
                  className="bg-gray-800 h-2 rounded transition-all duration-300"
                  style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentEx.question}
              </h2>

              <div className="bg-gray-50 border border-gray-200 rounded p-6 mb-6">
                <div className="text-3xl font-bold text-gray-800 mb-2 font-mono">
                  {currentEx.from} {currentEx.fromUnit}
                </div>
                <div className="text-xl text-gray-600">
                  = ? {currentEx.toUnit}
                </div>
              </div>

              {!showFeedback ? (
                <div className="space-y-4">
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full max-w-xs mx-auto px-4 py-3 text-center text-xl border-2 border-gray-300 rounded focus:border-gray-500 focus:outline-none font-mono"
                    placeholder="Antwort eingeben"
                    onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                  />
                  <div>
                    <button
                      onClick={submitAnswer}
                      disabled={!userAnswer.trim()}
                      className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded font-medium transition-colors"
                    >
                      Prüfen
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`text-xl font-bold ${currentEx.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {currentEx.isCorrect ? 'Richtig!' : 'Falsch!'}
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded p-4">
                    <div className="text-lg">
                      <span className="text-gray-600">Deine Antwort: </span>
                      <span className={`font-mono ${currentEx.isCorrect ? 'text-green-700 font-bold' : 'text-red-700'}`}>
                        {userAnswer}
                      </span>
                    </div>
                    {!currentEx.isCorrect && (
                      <div className="text-lg mt-2">
                        <span className="text-gray-600">Richtige Antwort: </span>
                        <span className="text-green-700 font-bold font-mono">{currentEx.correctAnswer}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={nextExercise}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded font-medium transition-colors"
                  >
                    {currentExercise < exercises.length - 1 ? 'Nächste Aufgabe' : 'Ergebnis anzeigen'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-6 space-x-4">
            <Link
              href="/flaechen/erklaerung"
              className="text-gray-700 hover:text-gray-900 underline"
            >
              Theorie wiederholen
            </Link>
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 underline"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}