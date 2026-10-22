# Financial model versions

| Version | File | What it is |
|---|---|---|
| earlier 1 (v1.0) | `versions/earlier-1_v1.0/DataMoat_Financial_Model_earlier-1_v1.0.xlsx` (inputs and builder backups beside it) | First model: guide-based, simple scenarios. Numbers (6.6 %, 2.9x, 0.75x, 3.5 students) are **out of date** |
| **CURRENT (v1.1)** | `model/DataMoat_Financial_Model_CURRENT_v1.1.xlsx` | After the CFO audit (18 fixes): 13-driver scenarios plus Stress, 3-year projection, market cap, channel economics. Source: `model/assumptions.csv`, `model/seasonality.csv`; rebuild with `model/build_model.py`. Changes explained in `docs/MODEL_AUDIT.md` |
