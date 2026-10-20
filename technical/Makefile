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
