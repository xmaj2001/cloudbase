"use client";

import { getStorageDriver } from "@/hooks/drivers/driver.registry";
import { useState } from "react";

// Lista de drivers suportados pelo sistema para poderes alternar no teste
const AVAILABLE_DRIVERS = ["CLOUDINARY", "GOOGLE_DRIVE"];

export default function CloudinaryTestPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDriverType, setSelectedDriverType] = useState<string>("CLOUDINARY"); // Estado do driver
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const log = (msg: string) => {
    setTerminalLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setUploadResult(null);
      log(`Ficheiro carregado: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
    }
  };

  const handleTestUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setProgress(0);
    setError(null);
    setUploadResult(null);

    log(`🚀 Solicitando driver para o tipo: ${selectedDriverType}...`);
    
    try {
      // 1. Pede o driver ao gestor central (Exatamente como o teu hook useUpload faz)
      const driver = getStorageDriver(selectedDriverType);

      if (!driver) {
        throw new Error(`Nenhum driver registado para o tipo: ${selectedDriverType}`);
      }

      log(`📡 Driver [${selectedDriverType}] obtido com sucesso. Disparando upload unificado...`);

      // 2. Executa o upload através da interface comum
      const result = await driver.upload({
        file: selectedFile,
        onProgress: (percentage) => {
          setProgress(percentage); // Ouve o progresso real vindo de dentro do driver
        }
      });
      
      setUploadResult(result);
      log(`✅ Sucesso! Resposta padronizada recebida.`);
    } catch (err: any) {
      setError(err.message);
      log(`❌ Falha no teste do motor: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div className="border-b pb-4">
        <h1 className="display text-3xl font-bold tracking-tight text-foreground">
          Storage Driver Engine Lab
        </h1>
        <p className="text-muted-foreground text-sm font-sans">
          Testa o comportamento polimórfico dos teus drivers através do gestor central.
        </p>
      </div>

      <div className="bg-card border p-6 rounded-xl space-y-4">
        {/* Selector de Driver adicionado para testar a modularidade */}
        <div>
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-2">
            Escolher Driver Ativo (Simulação)
          </label>
          <select
            value={selectedDriverType}
            onChange={(e) => {
              setSelectedDriverType(e.target.value);
              log(`🔄 Alterou driver de teste para: ${e.target.value}`);
            }}
            className="w-full p-2.5 border rounded-md bg-background text-sm mb-2"
          >
            {AVAILABLE_DRIVERS.map((type) => (
              <option key={type} value={type}>
                {type} Driver
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-2">
            Selecionar Ficheiro
          </label>
          <input 
            type="file" 
            onChange={handleFileChange}
            className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground cursor-pointer"
          />
        </div>

        {selectedFile && (
          <button
            onClick={handleTestUpload}
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm p-3 rounded-md transition-all disabled:opacity-50"
          >
            {loading ? `A enviar via ${selectedDriverType}... ${progress}%` : `Disparar Teste via ${selectedDriverType}`}
          </button>
        )}

        {/* Barra de Progresso Unificada */}
        {loading && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span>Progresso Real:</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Terminal de Saída Rápida */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-zinc-950 text-zinc-300 p-4 rounded-xl font-mono text-xs flex flex-col h-60">
          <span className="text-zinc-500 mb-2 border-b border-zinc-800 pb-1">CONSOLE LOGS</span>
          <div className="flex-1 overflow-y-auto space-y-1">
            {terminalLogs.map((t, i) => <div key={i}>{t}</div>)}
          </div>
        </div>

        <div className="bg-zinc-950 text-emerald-400 p-4 rounded-xl font-mono text-xs flex flex-col h-60 overflow-y-auto">
          <span className="text-zinc-500 mb-2 border-b border-zinc-800 pb-1">RESULTADO ENCAPSULADO</span>
          {error && <div className="text-red-400">Error: {error}</div>}
          {uploadResult ? (
            <pre className="whitespace-pre-wrap">{JSON.stringify(uploadResult, null, 2)}</pre>
          ) : (
            <span className="text-zinc-600 italic">Nenhum payload retornado ainda...</span>
          )}
        </div>
      </div>
    </div>
  );
}