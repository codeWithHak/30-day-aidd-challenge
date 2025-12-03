# Tasks: Python CLI Calculator

**Input**: Design documents from `/specs/001-cli-calculator/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are **REQUIRED** (TDD mandatory per Constitution).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `calculator/` and `tests/` at repository root.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure (calculator/, tests/, __init__.py) per plan.md
- [x] T002 Initialize pytest configuration in pytest.ini and conftest.py
- [x] T003 [P] Configure mypy in pyproject.toml or mypy.ini

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 [US1] Define Token and Context entities in calculator/engine.py
- [x] T005 [US1] Create CalculatorEngine class stub in calculator/engine.py
- [x] T006 [US1] Create CalculatorShell class stub in calculator/cli.py
- [x] T007 [US1] Define custom exceptions (CalculationError, etc.) in calculator/engine.py

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Interactive REPL (Priority: P1) 🎯 MVP

**Goal**: Launch an interactive shell to perform basic calculations (+, -, *, /)

**Independent Test**: Launch `python main.py`, type `2 + 2`, verify output `4`.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T008 [P] [US1] Create unit test for tokenizer in tests/test_engine.py
- [x] T009 [P] [US1] Create unit test for Shunting-Yard conversion in tests/test_engine.py
- [x] T010 [P] [US1] Create unit test for RPN evaluation in tests/test_engine.py
- [x] T011 [US1] Create integration test for REPL in tests/test_cli.py

### Implementation for User Story 1

- [x] T012 [US1] Implement tokenize() method in calculator/engine.py
- [x] T013 [US1] Implement to_rpn() method (Shunting-Yard) in calculator/engine.py
- [x] T014 [US1] Implement evaluate_rpn() method in calculator/engine.py
- [x] T015 [US1] Implement calculate() facade method in calculator/engine.py
- [x] T016 [US1] Implement CalculatorShell (cmd.Cmd) in calculator/cli.py
- [x] T017 [US1] Implement main.py entry point for REPL mode

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Command-Line Arguments (Priority: P1)

**Goal**: Pass expressions directly via CLI arguments

**Independent Test**: Run `python main.py "3 + 3"`, verify output `6`.

### Tests for User Story 2 ⚠️

- [ ] T018 [P] [US2] Create integration test for CLI argument mode in tests/test_cli.py

### Implementation for User Story 2

- [ ] T019 [US2] Update main.py to handle sys.argv arguments
- [ ] T020 [US2] Implement argument processing logic in calculator/cli.py

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Precision Math (Priority: P2)

**Goal**: Ensure decimal precision for scientific calculations

**Independent Test**: Calculate `0.1 + 0.2`, verify string output is `0.3`.

### Tests for User Story 3 ⚠️

- [ ] T021 [P] [US3] Create unit test for decimal precision (0.1+0.2) in tests/test_engine.py
- [ ] T022 [P] [US3] Create unit test for division precision (1/3) in tests/test_engine.py

### Implementation for User Story 3

- [ ] T023 [US3] Verify and refine Decimal usage in calculator/engine.py (already implemented in T014 but needs validation)
- [ ] T024 [US3] Implement context configuration (precision) in calculator/engine.py

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - History & UX (Priority: P3)

**Goal**: Command history and clear error messages

**Independent Test**: Verify error messages on division by zero.

### Tests for User Story 4 ⚠️

- [ ] T025 [P] [US4] Create test for error handling (DivByZero, Syntax) in tests/test_engine.py
- [ ] T026 [P] [US4] Create test for formatted error output in tests/test_cli.py

### Implementation for User Story 4

- [ ] T027 [US4] Implement robust error catching and printing in calculator/cli.py
- [ ] T028 [US4] Verify history support (native to cmd module) in calculator/cli.py

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T029 [P] Add docstrings to all public methods in calculator/engine.py
- [ ] T030 [P] Add type hints to all functions in calculator/
- [ ] T031 Run full test suite and verify 80%+ coverage

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Independent of US1 logic, but shares engine
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Refines US1 logic
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - Refines US1/US2 UX

### Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test REPL independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Demo REPL
3. Add User Story 2 → Test independently → Demo CLI args
4. Add User Story 3 → Test independently → Validate Precision
5. Add User Story 4 → Test independently → Verify UX

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
