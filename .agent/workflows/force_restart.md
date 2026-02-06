---
description: Force Restart Server on Port 5173
---

1. Kill any process on port 5173
// turbo
2. $p = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue; if ($p) { Stop-Process -Id $p.OwningProcess -Force }

3. Start dev server
// turbo
4. npm run dev -- --port 5173 --host
