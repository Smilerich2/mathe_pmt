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

const units = [
  { name: 'km', factor: 1000000000 },
  { name: 'hm', factor: 100000000 },
  { name: 'dam', factor: 10000000 },
  { name: 'm', factor: 1000000 },
  { name: 'dm', factor: 100000 },
  { name: 'cm', factor: 10000 },
  { name: 'mm', factor: 1000 },
  { name: 'μm', factor: 1 }
]

export default function Uebung() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const generateExercise = (id: number): Exercise => {
    const fromUnitIndex = Math.floor(Math.random() * units.length)
    let toUnitIndex = Math.floor(Math.random() * units.length)

    while (toUnitIndex === fromUnitIndex) {
      toUnitIndex = Math.floor(Math.random() * units.length)
    }

    const fromUnit = units[fromUnitIndex]
    const toUnit = units[toUnitIndex]

    let fromValue: number
    const stepDifference = Math.abs(toUnitIndex - fromUnitIndex)

    // 70% chance for easy/medium exercises, 30% for challenging ones
    const isChallengingExercise = Math.random() < 0.3

    if (fromUnitIndex < toUnitIndex) {
      // Going from larger to smaller unit (multiply)
      if (stepDifference === 1) {
        // Single step: mix of whole numbers and decimals
        if (isChallengingExercise) {
          fromValue = Math.round((Math.random() * 9 + 1) * 10) / 10 // 1.0-9.9
        } else {
          fromValue = Math.floor(Math.random() * 9) + 1 // 1-9
        }
      } else if (stepDifference === 2) {
        // Two steps: mostly whole numbers
        if (isChallengingExercise) {
          fromValue = Math.round((Math.random() * 4 + 1) * 10) / 10 // 1.0-4.9
        } else {
          fromValue = Math.floor(Math.random() * 9) + 1 // 1-9
        }
      } else if (stepDifference >= 3) {
        // Three+ steps: include some challenging conversions
        if (isChallengingExercise) {
          const decimals = [0.5, 1.2, 2.5, 3.8, 0.25, 1.75]
          fromValue = decimals[Math.floor(Math.random() * decimals.length)]
        } else {
          fromValue = Math.floor(Math.random() * 5) + 1 // 1-5
        }
      }
    } else {
      // Going from smaller to larger unit (divide)
      if (stepDifference === 1) {
        // Single step: mostly clean divisions
        if (isChallengingExercise) {
          const values = [15, 25, 35, 45, 55, 65, 75, 85, 95]
          fromValue = values[Math.floor(Math.random() * values.length)]
        } else {
          const multiplier = Math.floor(Math.random() * 9) + 1
          fromValue = multiplier * 10 // 10, 20, 30, etc.
        }
      } else if (stepDifference === 2) {
        // Two steps
        if (isChallengingExercise) {
          const values = [150, 250, 350, 450, 650, 750, 850, 950]
          fromValue = values[Math.floor(Math.random() * values.length)]
        } else {
          const multiplier = Math.floor(Math.random() * 9) + 1
          fromValue = multiplier * 100 // 100, 200, 300, etc.
        }
      } else if (stepDifference >= 3) {
        // Three+ steps: allow some decimal results
        if (isChallengingExercise) {
          const values = [1250, 2750, 3500, 4250, 6750, 8750]
          fromValue = values[Math.floor(Math.random() * values.length)]
        } else {
          const multiplier = Math.floor(Math.random() * 5) + 1
          fromValue = multiplier * 1000 // 1000, 2000, etc.
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
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = () => {
    const percentage = (score.correct / score.total) * 100
    if (percentage >= 90) return 'Ausgezeichnet! 🏆'
    if (percentage >= 80) return 'Sehr gut! 🌟'
    if (percentage >= 70) return 'Gut gemacht! 👍'
    if (percentage >= 60) return 'Nicht schlecht! 📈'
    return 'Übe weiter! 💪'
  }

  if (exercises.length === 0) {
    return <div>Lade Übungen...</div>
  }

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Übung abgeschlossen!</h1>

              <div className="text-6xl mb-6">
                {score.correct === score.total ? '🏆' : score.correct >= score.total * 0.8 ? '🌟' : '👍'}
              </div>

              <div className={`text-4xl font-bold mb-4 ${getScoreColor()}`}>
                {score.correct} / {score.total}
              </div>

              <div className="text-xl text-gray-600 mb-6">
                {getScoreMessage()}
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Deine Antworten:</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {exercises.map((ex, index) => (
                    <div key={ex.id} className="flex justify-between items-center p-2 rounded bg-white">
                      <span className="text-sm">{index + 1}. {ex.from} {ex.fromUnit} → {ex.toUnit}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{ex.userAnswer}</span>
                        <span className={`text-lg ${ex.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
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
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Neue Übung starten
                </button>
                <Link
                  href="/"
                  className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Zur Startseite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentEx = exercises[currentExercise]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Einheiten-Übung</h1>
            <div className="text-lg text-gray-600">
              Aufgabe {currentExercise + 1} von {exercises.length}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Richtig: {score.correct} | Falsch: {score.total - score.correct}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {currentEx.question}
              </h2>

              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
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
                    className="w-full max-w-xs mx-auto px-4 py-3 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Deine Antwort"
                    onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                  />
                  <div>
                    <button
                      onClick={submitAnswer}
                      disabled={!userAnswer.trim()}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Antwort prüfen
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`text-xl font-bold ${currentEx.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {currentEx.isCorrect ? '✅ Richtig!' : '❌ Falsch!'}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-lg">
                      <span className="text-gray-600">Deine Antwort: </span>
                      <span className={currentEx.isCorrect ? 'text-green-600 font-bold' : 'text-red-600'}>
                        {userAnswer}
                      </span>
                    </div>
                    {!currentEx.isCorrect && (
                      <div className="text-lg mt-2">
                        <span className="text-gray-600">Richtige Antwort: </span>
                        <span className="text-green-600 font-bold">{currentEx.correctAnswer}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={nextExercise}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    {currentExercise < exercises.length - 1 ? 'Nächste Aufgabe' : 'Ergebnis anzeigen'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/erklaerung"
              className="text-blue-600 hover:text-blue-800 underline mr-4"
            >
              💡 Hilfe anzeigen
            </Link>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}