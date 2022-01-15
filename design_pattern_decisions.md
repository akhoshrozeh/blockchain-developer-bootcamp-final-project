# Design Patterns

## Inheritance and Interfaces
Producer.sol inherits from OpenZeppelin's Ownable.sol contract, making use of the onlyOwner modifier. 

## Inter-Contract Execution
Producer.sol can instantiate another Producer contract object and calls it's function to get the price of a track.

## Access Control Design Patterns
Producer.sol uses modifier isOwner() to restrict access of calling certain functions.
ProducerFactory.sol uses modifier isNotProducer() to restrict access of calling function createProducer().
