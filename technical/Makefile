# DataMoat Monorepo Makefile
# Contract test target for Phase 0

.PHONY: test-contracts test-contracts-db

test-contracts:
	python -m pytest contracts/tests -v -rs

test-contracts-db:
	python -m pytest contracts/tests -m db -v -rs

.PHONY: test-docs
test-docs:
	python -m pytest tests -q

# === Agent A (datagen) ===
.PHONY: test-datagen
test-datagen:
	python -m pytest datagen/tests -v -rs

# === Agent D (public_validation) ===
.PHONY: test-public test-public-data
test-public:
	python -m pytest ml/public_validation/tests -m "not data" -v -rs

test-public-data:
	python -m pytest ml/public_validation/tests -v -rs

# === Agent E (genai_reports) ===
.PHONY: test-genai
test-genai:
	python -X utf8 -m pytest backend/app/genai/tests -v -rs



