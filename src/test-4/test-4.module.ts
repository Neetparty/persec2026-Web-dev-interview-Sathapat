import { Module } from '@nestjs/common'; // Imports Nest's module decorator to register Test-4 providers and routes.
import { Test4Controller } from './test-4.controller.js'; // Imports the controller that exposes the Test-4 route.
import { Test4Service } from './test-4.service.js'; // Imports the service that owns Test-4 behavior.

@Module({ // Declares the Nest module metadata for this case.
    imports: [], // Keeps this scaffold independent until Test-4 dependencies are specified.
    controllers: [Test4Controller], // Registers the Test-4 HTTP controller.
    providers: [Test4Service], // Registers the Test-4 service for dependency injection.
}) // Completes the Test-4 module metadata.
export class Test4Module { } // Exports the module so the application can register it.
