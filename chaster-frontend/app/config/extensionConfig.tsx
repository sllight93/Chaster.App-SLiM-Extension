'use client';

import { useState, useEffect } from 'react';
import isEqual from 'lodash.isequal';
import { ConfigDto } from "../schemas/config.dto";
import { configPresets } from "./difficultyLevels";

import Slider from "../components/Slider";
import RadioArray from "../components/RadioArray";
import HelpTooltip from "../components/HelpTooltip";


export interface ExtensionConfigProps {
  config: ConfigDto;
  onChange: (newConfig: ConfigDto) => void;
}

export const defaultConfig: ConfigDto = {
  difficulty: [],
  votes_target: 0,
  count_only_loggedin: true,
  split: 50,
  daily_quota: 15,
  punish_mult: 1.0,
}; 

// ... restlicher Code von ExtensionConfig.tsx

export default function ExtensionConfig({ config, onChange }: ExtensionConfigProps) {
  // Lokaler UI-State, abgeleitet von config.
  const [difficulty, setDifficulty] = useState(
    config.difficulty && config.difficulty.length > 0 ? config.difficulty[0].type : 'Normal'
  );
  const [split, setSplit] = useState(config.split);
  const [visitsRequired, setVisitsRequired] = useState(config.votes_target);
  const [dailyQuota, setDailyQuota] = useState(config.daily_quota);
  const [punishMult, setPunishMult] = useState(config.punish_mult);
  const [onlyCountLoggedIn, setOnlyCountLoggedIn] = useState(config.count_only_loggedin);

  // Synchronisiere lokalen UI-State, wenn config (vom Parent) sich ändert.
  useEffect(() => {
    setDifficulty(config.difficulty && config.difficulty.length > 0 ? config.difficulty[0].type : 'Normal');
    setSplit(config.split);
    setVisitsRequired(config.votes_target);
    setDailyQuota(config.daily_quota);
    setPunishMult(config.punish_mult);
    setOnlyCountLoggedIn(config.count_only_loggedin);
  }, [config]);

  // Erstelle das neue Config-Objekt
  const createNewConfig = (): ConfigDto => ({
    difficulty: Object.prototype.hasOwnProperty.call(configPresets, difficulty)
      ? Object.values(configPresets[difficulty]).map((item) => ({
          type: item.title,
          weight: item.weight,
        }))
      : [],
    votes_target: visitsRequired,
    count_only_loggedin: onlyCountLoggedIn,
    split: split,
    daily_quota: dailyQuota,
    punish_mult: punishMult,
  });

  // Bei onBlur wird überprüft, ob sich etwas geändert hat – falls ja, wird onChange aufgerufen.
  const handleBlur = () => {
    const newConfig = createNewConfig();
    if (!isEqual(newConfig, config)) {
      onChange(newConfig);
    }
  };

  const difficulties = Object.keys(configPresets);

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        {/* Row 1: Visits, Daily Quota, Punish Multiplier */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '1rem',
          }}
        >
          <div>
            <label>
              Visits Required<HelpTooltip description="Amount of votes you'll need on your shared link." />
              <input
                type="number"
                value={visitsRequired}
                onChange={(e) => setVisitsRequired(Number(e.target.value))}
                onBlur={handleBlur}
              />
            </label>
          </div>
          <div>
            <label>
              Daily Quota<HelpTooltip description="The amount of votes you'll have to collect each day." />
              <input
                type="number"
                value={dailyQuota}
                onChange={(e) => setDailyQuota(Number(e.target.value))}
                onBlur={handleBlur}
              />
            </label>
          </div>
          <div>
            <label>
              Multiplier <HelpTooltip description="Punishment multiplier if you don't reach your quota. (<daily quota> - <daily votes>) * <multiplier>" />
              <input
                type="number"
                step="0.01"
                value={punishMult}
                onChange={(e) => setPunishMult(Number(e.target.value))}
                onBlur={handleBlur}
              />
            </label>
          </div>
        </div>

        {/* Row 2: Slider */}
        <div>
          <Slider
            label="Split"
            min={25}
            max={75}
            value={split}
            onChange={(newVal) => setSplit(newVal)}
            onBlur={handleBlur}
          />
        </div>

        {/* Row 3: Checkbox */}
        <div>
          <label>
            Only count votes from logged-in users:
            <input
              type="checkbox"
              checked={onlyCountLoggedIn}
              onChange={(e) => setOnlyCountLoggedIn(e.target.checked)}
              onBlur={handleBlur}
            />
          </label>
        </div>

        {/* Row 4: Difficulty settings und ein weiteres DIV */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}
        >
          <div>
            <RadioArray
              label="Difficulty:"
              name="difficulty"
              options={difficulties}
              selected={difficulty}
              onChange={(val) => setDifficulty(val)}
              onBlur={handleBlur}
            />
          </div>
          <div>
            {/* Hier kannst du weiteren Content einfügen. */}
            <p>Zusätzliche Einstellungen?</p>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}