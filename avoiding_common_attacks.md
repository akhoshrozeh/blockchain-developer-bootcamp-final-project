# Contract Security Measures

## SWC-103 Floating Pragma
Both Producer.sol and ProducerFactory.sol use compiler version `0.8.10` to ensure that the contracts do not accidentally get deployed using an outdated compiler version that might introduce bugs that affect the contract system negatively.

## SWC-123 Requirement Violation and SWC-110 Assert Violation
### Proper Use of Require, Assert, and Revert
Producer.sol and ProducerFactory.sol uses Require before state changes and Assert after state changes. Uses revert in fallback and receive functions. 

## Use Modifiers Only for Validation
Producer.sol and ProducerFactory.sol only use modifiers to check that preconditions for a function have been met before they're called.

## SWC-113 DoS with Failed Call
### Proper Use of .call
Producer.sol uses .call to send funds to another contract and doesn't user transfer() or send(). Also checks if .call fails.
