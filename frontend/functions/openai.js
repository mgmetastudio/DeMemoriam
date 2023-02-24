import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
import axios from "axios"

export default function openai() {
    
    const [result, setResult] = useState('');

    const apiKey = "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";

    const client = axios.create({
        headers: {
          Authorization: "Bearer " + apiKey,
        },
      });
      
      const params = {
        prompt: "How are you?",
        model: "text-davinci-003",
        max_tokens: 10,
        temperature: 0,
      };
      
      client
        .post("https://api.openai.com/v1/completions", params)
        .then((result) => {
          console.log(result.data.choices[0].text);
          setResult(result.data.choices[0].text);
        })
        .catch((err) => {
          console.log(err);
        });

  return (
    <View>
      <Text>openai</Text>
    </View>
  )
}