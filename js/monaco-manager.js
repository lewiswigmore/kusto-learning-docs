class MonacoManager {
    constructor() {
        this.editors = new Map();
        this.isInitialized = false;
        this.initializeMonaco();
    }

    async initializeMonaco() {
        return new Promise((resolve, reject) => {
            if (typeof monaco !== 'undefined') {
                this.isInitialized = true;
                resolve();
                return;
            }

            require.config({
                paths: {
                    'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs'
                }
            });

            require(['vs/editor/editor.main'], () => {
                // Define KQL language with proper syntax highlighting
                monaco.languages.register({ id: 'kql' });

                monaco.languages.setMonarchTokensProvider('kql', {
                    tokenizer: {
                        root: [
                            // Comments
                            [/\/\/.*$/, 'comment'],
                            [/\/\*/, 'comment', '@comment'],
                            
                            // Management commands (start with dot) - entire line should be blue
                            [/^\s*\..*$/, 'management'],
                            
                            // Strings
                            [/"([^"\\]|\\.)*"/, 'string'],
                            [/'([^'\\]|\\.)*'/, 'string'],
                            
                            // Table names (capitalized identifiers or known table names)
                            [/\b(AuthenticationEvents|Employees|SigninLogs|SecurityEvent|Heartbeat|Perf|Event|Syslog|CommonSecurityLog|AzureActivity|AzureDiagnostics|VMConnection|ServiceMapComputer_CL|ServiceMapProcess_CL|W3CIISLog|AppServiceHTTPLogs|FunctionAppLogs|ContainerLog|KubeEvents|KubePodInventory)\b/, 'table'],
                            [/\b[A-Z][a-zA-Z0-9_]*(?=\s*\||\s*$)/, 'table'],
                            
                            // Query operators (orange in ADX)
                            [/\b(take|project|where|summarize|extend|join|union|sort|order|top|sample|distinct|render|search|parse|evaluate|invoke|print|datatable|range|materialize|serialize|as|into|fork|partition|facet|mv-expand|mv-apply|getschema|externaldata)\b/, 'query-operator'],
                            
                            // Functions (blue in ADX)
                            [/\b(ago|now|datetime|timespan|todatetime|tostring|toint|todouble|tobool|totimespan|bin|floor|ceiling|round|abs|sqrt|pow|log|exp|sin|cos|tan|asin|acos|atan|strlen|substring|tolower|toupper|trim|split|replace|strcat|indexof|countof|extract|parse_json|todynamic|bag_keys|array_length|array_index_of|array_slice|hash|hash_sha1|hash_sha256|hash_md5|base64_encode_tostring|base64_decode_tostring|url_encode|url_decode|count|sum|avg|min|max|stdev|variance|percentile|percentiles|dcount|dcountif|countif|sumif|avgif|minif|maxif|arg_max|arg_min|make_list|make_set|make_bag|pack|pack_array|pack_all|unpack|bag_unpack|treepath|format_datetime|format_timespan|dayofweek|dayofmonth|dayofyear|weekofyear|monthofyear|getyear|getmonth|startofday|startofweek|startofmonth|startofyear|endofday|endofweek|endofmonth|endofyear|isempty|isnull|isnotnull|isnan|isfinite|isinf|case|iff|coalesce|iif)\b/, 'function'],
                            
                            // Join types and keywords (blue)
                            [/\b(kind|inner|outer|left|right|anti|semi|innerunique|leftouter|rightouter|fullouter|leftanti|rightanti|leftsemi|rightsemi)\b/, 'keyword'],
                            
                            // Other keywords (blue)
                            [/\b(let|on|by|asc|desc|nulls|first|last|granny|hint\.strategy|hint\.num_partitions|hint\.shufflekey|hint\.spread|with|step|from|to|in|has|contains|startswith|endswith|matches|regex|between|and|or|not|true|false|null|dynamic|real|int|long|string|bool|decimal|guid)\b/, 'keyword'],
                            
                            // Field names and column references (pinkish-red)
                            [/\b[a-z_][a-zA-Z0-9_]*\b(?=\s*[,=<>!]|\s*\))/, 'field'],
                            [/\b[a-z_][a-zA-Z0-9_]*\b(?=\s*==|\s*!=|\s*<=|\s*>=|\s*<|\s*>)/, 'field'],
                            
                            // Operators
                            [/==|!=|<=|>=|<>/, 'operator'],
                            [/=(?!=)/, 'assignment'],
                            [/[<>]/, 'operator'],
                            [/[+\-*\/]/, 'operator'],
                            
                            // Pipe operator (special highlighting)
                            [/\|/, 'pipe'],
                            
                            // Numbers
                            [/\b\d+\.?\d*([eE][-+]?\d+)?\b/, 'number'],
                            [/\b0x[0-9a-fA-F]+\b/, 'number'],
                            
                            // Parentheses and brackets
                            [/[()[\]{}]/, 'delimiter'],
                            [/[,;]/, 'delimiter'],
                            
                            // Generic identifiers (fallback)
                            [/[a-zA-Z_][a-zA-Z0-9_]*/, 'identifier'],
                            
                            // Whitespace
                            [/\s+/, ''],
                        ],
                        
                        comment: [
                            [/[^\/*]+/, 'comment'],
                            [/\*\//, 'comment', '@pop'],
                            [/[\/*]/, 'comment']
                        ]
                    }
                });

                // Define ADX-like theme with proper colors
                monaco.editor.defineTheme('kql-clean', {
                    base: 'vs',
                    inherit: true,
                    rules: [
                        // Table names - purple like ADX
                        { token: 'table', foreground: '800080' },
                        
                        // Query operators - orange like ADX (take, project, where, summarize, etc.)
                        { token: 'query-operator', foreground: 'ff8800' },
                        
                        // Functions - blue like ADX (todatetime, bin, count, etc.)
                        { token: 'function', foreground: '0066cc' },
                        
                        // Keywords - blue like ADX (let, kind, inner, on, by, etc.)
                        { token: 'keyword', foreground: '0066cc' },
                        
                        // Field names - pinkish-red like ADX
                        { token: 'field', foreground: 'cc3366' },
                        
                        // Management commands - blue (entire .show schema etc.)
                        { token: 'management', foreground: '0066cc' },
                        
                        // Strings - red
                        { token: 'string', foreground: 'cc0000' },
                        
                        // Comments - green and italic
                        { token: 'comment', foreground: '008000', fontStyle: 'italic' },
                        
                        // Operators - black
                        { token: 'operator', foreground: '000000' },
                        { token: 'assignment', foreground: '000000' },
                        
                        // Pipe operators - special blue
                        { token: 'pipe', foreground: '0066cc' },
                        
                        // Numbers - dark green
                        { token: 'number', foreground: '006600' },
                        
                        // Delimiters - black
                        { token: 'delimiter', foreground: '000000' },
                        
                        // Generic identifiers - dark blue
                        { token: 'identifier', foreground: '000080' }
                    ],
                    colors: {
                        'editor.background': '#ffffff'
                    }
                });

                this.isInitialized = true;
                resolve();
            }, reject);
        });
    }

    async createEditor(containerId, code, options = {}) {
        await this.initializeMonaco();
        
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id ${containerId} not found`);
            return null;
        }

        const defaultOptions = {
            value: code,
            language: 'kql',
            theme: 'kql-clean',
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: 'off',
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden'
            },
            overviewRulerBorder: false,
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            fontSize: 14,
            lineHeight: 20,
            padding: { top: 0, bottom: 0, left: 0, right: 0 },
            wordWrap: 'on',
            contextmenu: false,
            renderLineHighlight: 'none',
            selectionHighlight: false,
            occurrencesHighlight: false
        };

        const editorOptions = { ...defaultOptions, ...options };
        
        // Set initial container height (will be adjusted after editor creation)
        const lines = code.split('\n').length;
        const initialHeight = Math.max(40, lines * 20);
        
        // Create a wrapper with padding
        const wrapper = document.createElement('div');
        wrapper.style.border = '1px solid #e2e8f0';
        wrapper.style.borderRadius = '8px';
        wrapper.style.overflow = 'hidden';
        wrapper.style.padding = '0 12px';
        wrapper.style.backgroundColor = '#ffffff';
        
        // Set the actual editor container - no border, seamless
        container.style.height = `${initialHeight}px`;
        container.style.width = '100%';
        container.style.border = 'none';
        container.style.outline = 'none';
        
        // Wrap the container
        const parent = container.parentNode;
        parent.insertBefore(wrapper, container);
        wrapper.appendChild(container);

        const editor = monaco.editor.create(container, editorOptions);
        
        // Adjust height after editor is created to fit content exactly
        setTimeout(() => {
            const contentHeight = editor.getContentHeight();
            const finalHeight = Math.max(40, contentHeight);
            container.style.height = `${finalHeight}px`;
            editor.layout(); // Trigger layout recalculation
        }, 100);

        this.editors.set(containerId, editor);
        this.editors.set(containerId, editor);

        // Add copy functionality
        this.addCopyButton(container, code);

        return editor;
    }

    addCopyButton(container, code) {
        const copyButton = document.createElement('button');
        copyButton.className = 'absolute top-2 right-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs hover:bg-blue-200 transition-colors duration-200 z-10';
        copyButton.textContent = 'Copy';
        copyButton.style.position = 'absolute';
        
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(code);
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied!';
                copyButton.classList.add('bg-green-100', 'text-green-800');
                copyButton.classList.remove('bg-blue-100', 'text-blue-800');
                
                setTimeout(() => {
                    copyButton.textContent = originalText;
                    copyButton.classList.remove('bg-green-100', 'text-green-800');
                    copyButton.classList.add('bg-blue-100', 'text-blue-800');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });

        container.style.position = 'relative';
        container.appendChild(copyButton);
    }

    getEditor(containerId) {
        return this.editors.get(containerId);
    }

    disposeEditor(containerId) {
        const editor = this.editors.get(containerId);
        if (editor) {
            editor.dispose();
            this.editors.delete(containerId);
        }
    }

    disposeAllEditors() {
        for (const [containerId, editor] of this.editors) {
            editor.dispose();
        }
        this.editors.clear();
    }

    // Process all code blocks in the current content
    async processCodeBlocks() {
        const codeBlocks = document.querySelectorAll('.code-block pre code');
        const promises = [];

        codeBlocks.forEach((codeElement, index) => {
            const code = codeElement.textContent.trim();
            const editorId = `monaco-editor-${index}`;
            
            // Create container for Monaco editor
            const container = document.createElement('div');
            container.id = editorId;
            container.className = 'monaco-container';
            
            // Replace the code block with Monaco editor container
            const codeBlock = codeElement.closest('.code-block');
            codeBlock.parentNode.replaceChild(container, codeBlock);
            
            // Create the editor
            promises.push(this.createEditor(editorId, code));
        });

        await Promise.all(promises);
    }
}

// Global instance
window.monacoManager = new MonacoManager();