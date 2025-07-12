"use client";

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Sparkles, FileUp, TableProperties } from "lucide-react";

const NullValueFiller = () => {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [processedData, setProcessedData] = useState([]);
  const fileInputRef = useRef(null);

  const parseCSV = (text) => {
    const [headerLine, ...lines] = text.trim().split("\n");
    const headers = headerLine.split(",").map(h => h.trim());

    const rows = lines.map(line => {
      const values = line.split(",").map(v => v.trim());
      return Object.fromEntries(headers.map((h, i) => [h, values[i]]));
    });

    return rows;
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const parsed = parseCSV(text);

      // Optional: filter out rows missing Date or BU
      const valid = parsed.filter(row => row.Date && row.BU);

      setData(valid);
    };
    reader.readAsText(file);
  };

  const fillNulls = () => {
    const filled = [];
    const lastSeen = {};

    for (const row of data) {
      const key = `${row.BU}`;
      const val = row.Value === "NULL" || row.Value === "" ? null : parseFloat(row.Value);

      if (val != null) {
        lastSeen[key] = val;
        filled.push({ ...row, Value: val });
      } else {
        filled.push({ ...row, Value: lastSeen[key] ?? null });
      }
    }

    setProcessedData(filled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-purple-100 p-8">
      <Card className="p-8 shadow-xl bg-white/80 border border-purple-200 rounded-2xl">
        <h2 className="text-3xl font-bold text-purple-700 mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6" /> Replace NULLs in BU Values By Harsh Kumar
        </h2>

        <div className="flex items-center gap-4 mb-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-2"
          >
            <FileUp className="w-4 h-4" /> Upload CSV
          </Button>
          {fileName && <p className="text-gray-700 font-medium">Uploaded: <span className="text-purple-800">{fileName}</span></p>}
        </div>

        {data.length > 0 && (
          <Button onClick={fillNulls} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg mb-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Process Data
          </Button>
        )}

        {processedData.length > 0 && (
          <CardContent className="bg-white border-t pt-6">
            <h3 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
              <TableProperties className="w-5 h-5" /> Processed Data Table
            </h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <Table className="min-w-full divide-y divide-gray-200">
                <TableHeader className="bg-purple-100 text-purple-800">
                  <TableRow>
                    <TableCell className="font-semibold">Date</TableCell>
                    <TableCell className="font-semibold">BU</TableCell>
                    <TableCell className="font-semibold">Value</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-100">
                  {processedData.map((row, i) => (
                    <TableRow key={i} className="hover:bg-purple-50">
                      <TableCell>{row.Date}</TableCell>
                      <TableCell>{row.BU}</TableCell>
                      <TableCell>{row.Value ?? "NULL"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default NullValueFiller;
