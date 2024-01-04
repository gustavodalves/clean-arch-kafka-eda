# Project Clean Architecture with Kafka - Event-Driven Architecture

This is a project that combines Clean Architecture with Kafka, based on the event-driven architecture. It emphasizes the implementation of the Service Layer pattern, as proposed by Martin Fowler, for use cases. The main focus is on decoupling components using a message broker, such as Kafka, resulting in a more flexible and scalable architecture.

## Clean Architecture

Clean Architecture is a paradigm that aims for a clear separation of responsibilities into distinct layers, promoting modularity and testability. The main layers include:

1. **Entities**: Represent domain objects.
2. **Use Cases**: Contain business logic.
3. **Controllers**: Manage input and output.
4. **Gateways**: Abstractions for external services.

## Martin Fowler's Service Layer Pattern

The Service Layer pattern, proposed by Martin Fowler, is used to encapsulate business logic in a service layer. Use cases are implemented in this layer, providing a clear separation between application logic and the responsibilities of other layers.

## Kafka - Event-Driven Architecture

The project uses Apache Kafka to implement an event-driven architecture. Kafka facilitates asynchronous communication and real-time event processing, promoting scalability and system resilience.
