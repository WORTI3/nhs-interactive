"use client";

import { Button, Input } from "nhsuk-react-components";
import { ChangeEvent, useEffect, useState } from "react";
import { LOCAL_KEY_ID } from "../lib/utils/constants";

export const Settings = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleClear = () => {
    localStorage.removeItem(LOCAL_KEY_ID);
    setApiKey('');
  };

  const handleSave = () => {
    if (apiKey.length !== 51 && apiKey !== "local") {
      setError(true);
      return;
    }
    localStorage.setItem(LOCAL_KEY_ID, JSON.stringify(apiKey));
    setShowSettings(false);
    setError(false);
  };

  useEffect(() => {
    const API_KEY = localStorage.getItem(LOCAL_KEY_ID);
    if (API_KEY) {
      setApiKey(JSON.parse(API_KEY));
    }
  }, []);
  
  return (
    <>
      <Button disabled={error} as='a' onClick={() => setShowSettings(!showSettings)}>
        {showSettings ? "Hide" : "Show"} Settings
      </Button>
      {showSettings && (
        <>
          <Input
            id="api-key-input"
            label="OpenAi API Key"
            name="api key"
            value={apiKey}
            type="password"
            error={error ? 'provide a valid OpenAi API Key' : ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setApiKey(e.target.value);
            }}
          />
          <div className='flex space-x-2 mt-6'>
            <Button secondary onClick={handleSave}>
              Save
            </Button>
            <Button secondary onClick={handleClear}>
              Clear
            </Button>
          </div>
        </>
      )}
    </>
  );
};