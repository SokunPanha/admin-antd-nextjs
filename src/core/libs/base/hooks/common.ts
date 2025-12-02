"use client"

import React,{useRef, useState,useEffect} from "react"
import {sleep} from "../utils"

// update and render function execute
export const useUpdate = () => {
  const [dep, setDep] = useState(0)
  return () => {
    setDep(dep + 1)
  }
}


// use count down
export const useCountDown = () => {
  const [value, setValue] = useState(0)
  const ref = useRef(0)

  const reset = (seconds: number) => {
    ref.current++
    setValue(seconds);
    (async () => {
      const {current} = ref
      for (let i = seconds; i >= 0; i--) {
        // 保证重复reset时不会执行
        if (current !== ref.current) {
          return
        }
        await sleep(1000)
        if (current !== ref.current) {
          return
        }
        setValue(i)
      }
    })()
  }

  return {
    reset,
    value
  }
}


// use effect if condition is true
export const useEffectIf = (effect: React.EffectCallback, condition: boolean) => {
  useEffect(() => {
    if (condition) {
      effect()
    }
  }, [condition])
}


// use locals storage
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const v = localStorage.getItem(key)
    if (v) {
      return JSON.parse(v)
    }
    return defaultValue
  })

  return [value, (v: T) => {
    localStorage.setItem(key, JSON.stringify(v))
    setValue(v)
  }]
}
