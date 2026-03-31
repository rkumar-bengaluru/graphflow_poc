import { Integration } from '../types'; // adjust path to your type definitions
export function getIntegrations(): Integration[] {
    return [
        {
            Name: 'Qdrant',
            Description: 'Integration with Qdrant vector database',
            Actions: [
                {
                    Name: 'Test Action', Description: 'Validate framework wiring', ActionType: 'qdrant_test',
                    InputSchema: {
                        type: 'object',
                        properties: {
                            message: { type: 'string', description: 'Sample input message', source: 'user_input' },
                        },
                        required: ['message'],
                    }, OutputSchema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean', description: 'Indicates success' },
                            echo: { type: 'string', description: 'Echoes back the input string' },
                        },
                        required: ['success', 'echo'],
                    },
                },
                {
                    Name: 'Search Action', Description: 'Perform semantic search', ActionType: 'qdrant_search',
                    InputSchema: {
                        type: 'object',
                        properties: {
                            message: { type: 'string', description: 'Sample input message', source: 'user_input' },
                        },
                        required: ['message'],
                    }, OutputSchema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean', description: 'Indicates success' },
                            echo: { type: 'string', description: 'Echoes back the input string' },
                        },
                        required: ['success', 'echo'],
                    },
                },
                {
                    Name: 'Insert Action', Description: 'Insert embeddings', ActionType: 'qdrant_insert',
                    InputSchema: {
                        type: 'object',
                        properties: {
                            message: { type: 'string', description: 'Sample input message', source: 'user_input' },
                        },
                        required: ['message'],
                    }, OutputSchema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean', description: 'Indicates success' },
                            echo: { type: 'string', description: 'Echoes back the input string' },
                        },
                        required: ['success', 'echo'],
                    },
                },
            ],
        },
        {
            Name: 'LLM',
            Description: 'Large Language Model integration',
            Actions: [
                {
                    Name: 'Generate Text', Description: 'Produce text output', ActionType: 'llm_generate',
                    InputSchema: {
                        type: 'object',
                        properties: {
                            message: { type: 'string', description: 'Sample input message', source: 'user_input' },
                        },
                        required: ['message'],
                    }, OutputSchema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean', description: 'Indicates success' },
                            echo: { type: 'string', description: 'Echoes back the input string' },
                        },
                        required: ['success', 'echo'],
                    },
                },
                {
                    Name: 'Summarize', Description: 'Summarize documents', ActionType: 'llm_summarize',
                    InputSchema: {
                        type: 'object',
                        properties: {
                            message: { type: 'string', description: 'Sample input message', source: 'user_input' },
                        },
                        required: ['message'],
                    }, OutputSchema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean', description: 'Indicates success' },
                            echo: { type: 'string', description: 'Echoes back the input string' },
                        },
                        required: ['success', 'echo'],
                    },
                },
            ],
        },
        {
            Name: 'Database',
            Description: 'Integration with relational databases like Postgres & Azure SQL',
            Actions: [
                {
                    Name: 'Test Action',
                    Description: 'A simple test action to validate framework wiring',
                    ActionType: 'test_action',
                    InputSchema: {
                        type: 'object',
                        properties: {
                            message: { type: 'string', description: 'Sample input message', source: 'user_input' },
                        },
                        required: ['message'],
                    },
                    OutputSchema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean', description: 'Indicates success' },
                            echo: { type: 'string', description: 'Echoes back the input string' },
                        },
                        required: ['success', 'echo'],
                    },
                },
                {
                    Name: 'Execute Query Action',
                    Description: 'Execute a raw SQL query',
                    ActionType: 'execute_query',
                    InputSchema: {
                        type: 'object',
                        properties: {
                            query: { type: 'string', description: 'User query', source: 'user_input' },
                            allow_write: { type: 'boolean', description: 'Allow non-SELECT queries', default: false },
                            max_rows: { type: 'number', description: 'Maximum rows to return', default: 1000 },
                        },
                        required: ['query'],
                    },
                    OutputSchema: {
                        type: 'object',
                        properties: {
                            content: { type: 'string', description: 'SQL query response' },
                        },
                    },
                },
                {
                    Name: 'Execute Function Action',
                    Description: 'Execute a stored procedure by name',
                    ActionType: 'execute_function',
                    InputSchema: {
                        type: 'object',
                        properties: {
                            proc_name: { type: 'string', description: 'Stored procedure name', source: 'user_input' },
                            params: {
                                type: 'object',
                                description: 'Key-value map of stored procedure parameters',
                                source: 'user_input',
                                additionalProperties: true,
                            },
                        },
                        required: ['proc_name', 'params'],
                    },
                    OutputSchema: {
                        type: 'object',
                        properties: {
                            rows: { type: 'array', description: 'Result rows returned' },
                            status: { type: 'string', description: 'Execution status' },
                        },
                    },
                },
                {
                    Name: 'Describe Stored Procedure',
                    Description: 'Describe stored procedure inputs/outputs',
                    ActionType: 'describe_stored_proc',
                    InputSchema: {
                        type: 'object',
                        properties: {
                            proc_name: { type: 'string', description: 'Stored procedure name', source: 'user_input' },
                        },
                        required: ['proc_name'],
                    },
                    OutputSchema: {
                        type: 'object',
                        properties: {
                            inputs: { type: 'array', description: 'List of input parameters' },
                            outputs: { type: 'array', description: 'List of output fields' },
                        },
                    },
                },
            ],
        },
    ];
}
