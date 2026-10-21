// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useEffect } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

const NETWORKS = [
  { label: "Devnet", value: "devnet" },
  { label: "Testnet", value: "testnet" },
  { label: "Mainnet", value: "mainnet" },
];

// The networks whose OpenRPC spec the build downloaded. scripts/getopenrpcspecs.js
// writes the list; a network that no longer publishes a spec is not offered.
async function loadAvailable() {
  try {
    const res = await fetch("/open-spec/networks.json");
    if (!res.ok) return NETWORKS.map((n) => n.value);
    const list = await res.json();
    return Array.isArray(list) && list.length ? list : NETWORKS.map((n) => n.value);
  } catch {
    return NETWORKS.map((n) => n.value);
  }
}

const NetworkSelect = () => {
  const [available, setAvailable] = useState(NETWORKS.map((n) => n.value));
  const [selection, setSelection] = useState(() => {
    if (ExecutionEnvironment.canUseDOM) {
      return localStorage.getItem("RPC") ?? "mainnet";
    }
    return "mainnet";
  });

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;
    loadAvailable().then((list) => {
      setAvailable(list);
      if (!list.includes(selection)) setSelection(list.includes("mainnet") ? "mainnet" : list[0]);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("RPC", selection);
    window.dispatchEvent(new Event("storage"));
  }, [selection]);

  const rpcUrl = `https://fullnode.${selection}.sui.io:443`;

  return (
    <StyledEngineProvider injectFirst>
      <div className="w-full">
        <FormControl fullWidth size="small">
          <InputLabel id="network">Network</InputLabel>
          <Select
            labelId="network"
            id="network-select"
            value={selection}
            label="Network"
            onChange={(e) => setSelection(e.target.value)}
            className="dark:text-white dark:bg-sui-ghost-dark"
          >
            {NETWORKS.filter((n) => available.includes(n.value)).map((n) => (
              <MenuItem key={n.value} value={n.value}>
                {n.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText className="api-muted">
            RPC: <span className="api-typechip">{rpcUrl}</span>
          </FormHelperText>
        </FormControl>
      </div>
    </StyledEngineProvider>
  );
};

export default NetworkSelect;
