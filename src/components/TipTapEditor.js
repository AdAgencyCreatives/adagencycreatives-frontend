import { useEffect, useRef } from 'react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Link from '@tiptap/extension-link';

import 'remixicon/fonts/remixicon.css';
import '../styles/TipTapEditor.css';

const TipTapEditor = ({ label, name, value, onChange }) => {
    const editorRef = useRef(null);
    const editorInstance = useRef(null);
    const hiddenTextareaRef = useRef(null);

    useEffect(() => {
        if (!editorRef.current) return;

        // Initialize editor
        editorInstance.current = new Editor({
            element: editorRef.current.querySelector('.tiptap-editor-content'),
            extensions: [
                StarterKit,
                Bold,
                Italic,
                Underline,
                Heading.configure({
                    levels: [1, 2, 3, 4, 5, 6],
                }),
                BulletList,
                OrderedList,
                Link.configure({
                    openOnClick: false,
                }),
            ],
            content: value.replaceAll("<li><p>", "<li>").replaceAll("</p></li>", "</li>"),
            onUpdate: ({ editor }) => {
                const html = editor.getHTML().replaceAll("<li><p>", "<li>").replaceAll("</p></li>", "</li>");
                if (hiddenTextareaRef.current) {
                    hiddenTextareaRef.current.value = html;
                }
                if (onChange) {
                    onChange({ target: { name, value: html } });
                }
                updateStatusBar(editor);
            },
            onSelectionUpdate: ({ editor }) => {
                updateStatusBar(editor);
            },
        });

        // Add toolbar buttons
        addToolbarButtons(editorInstance.current);

        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
            }
        };
    }, []);

    const capitalize = (str) => {
        if (!str) return str; // handle empty string
        if (str.length === 1) return str.toUpperCase(); // capitalize single character
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const updateStatusBar = (editor) => {
        const statusElement = editorRef.current.querySelector('.status-hierarchy');
        let hierarchy = [];

        const { from, to } = editor.state.selection;

        editor.state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.type.name === 'text') return;

            const nodeInfo = {
                type: node.type.name,
                attrs: node.attrs,
            };

            if (node.type.name === 'heading') {
                nodeInfo.type = `Heading ${node.attrs.level}`;
            }

            hierarchy.push(nodeInfo.type);
        });

        statusElement.textContent =
            hierarchy.length > 0
                ? hierarchy.map((item) => capitalize(item)).join(' > ')
                : 'Paragraph';
    };

    const addToolbarButtons = (editor) => {
        const container = editorRef.current.querySelector('.tiptap-editor-header');
        if (!container) return;

        // Clear existing buttons
        container.innerHTML = '';

        const buttons = [
            {
                icon: 'ri-bold',
                title: 'Bold',
                action: () => editor.chain().focus().toggleBold().run(),
                active: () => editor.isActive('bold'),
            },
            {
                icon: 'ri-italic',
                title: 'Italic',
                action: () => editor.chain().focus().toggleItalic().run(),
                active: () => editor.isActive('italic'),
            },
            {
                icon: 'ri-underline',
                title: 'Underline',
                action: () => editor.chain().focus().toggleUnderline().run(),
                active: () => editor.isActive('underline'),
            },
            {
                icon: 'ri-h-1',
                title: 'Heading 1',
                action: () =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run(),
                active: () => editor.isActive('heading', { level: 1 }),
            },
            {
                icon: 'ri-h-2',
                title: 'Heading 2',
                action: () =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run(),
                active: () => editor.isActive('heading', { level: 2 }),
            },
            {
                icon: 'ri-h-3',
                title: 'Heading 3',
                action: () =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run(),
                active: () => editor.isActive('heading', { level: 3 }),
            },
            {
                icon: 'ri-h-4',
                title: 'Heading 4',
                action: () =>
                    editor.chain().focus().toggleHeading({ level: 4 }).run(),
                active: () => editor.isActive('heading', { level: 4 }),
            },
            {
                icon: 'ri-h-5',
                title: 'Heading 5',
                action: () =>
                    editor.chain().focus().toggleHeading({ level: 5 }).run(),
                active: () => editor.isActive('heading', { level: 5 }),
            },
            {
                icon: 'ri-h-6',
                title: 'Heading 6',
                action: () =>
                    editor.chain().focus().toggleHeading({ level: 6 }).run(),
                active: () => editor.isActive('heading', { level: 6 }),
            },
            {
                icon: 'ri-list-unordered',
                title: 'Bullet List',
                action: () => editor.chain().focus().toggleBulletList().run(),
                active: () => editor.isActive('bulletList'),
            },
            {
                icon: 'ri-list-ordered',
                title: 'Numbered List',
                action: () => editor.chain().focus().toggleOrderedList().run(),
                active: () => editor.isActive('orderedList'),
            },
            {
                icon: 'ri-link',
                title: 'Link',
                action: () => {
                    const previousUrl = editor.getAttributes('link').href;
                    const url = window.prompt('URL', previousUrl);

                    if (url === null) return;

                    if (url === '') {
                        editor
                            .chain()
                            .focus()
                            .extendMarkRange('link')
                            .unsetLink()
                            .run();
                        return;
                    }

                    editor
                        .chain()
                        .focus()
                        .extendMarkRange('link')
                        .setLink({ href: url })
                        .run();
                },
                active: () => editor.isActive('link'),
            },
            {
                icon: 'ri-format-clear',
                title: 'Clear Formatting',
                action: () =>
                    editor.chain().focus().clearNodes().unsetAllMarks().run(),
            },
        ];

        buttons.forEach((btn) => {
            const button = document.createElement('button');
            button.className = 'tiptap-editor-button';
            button.title = btn.title;
            button.type = 'button';
            button.innerHTML = `<i class="${btn.icon}"></i>`;
            button.addEventListener('click', btn.action);

            if (btn.active) {
                editor.on('transaction', () => {
                    button.classList.toggle('is-active', btn.active());
                });
            }

            container.appendChild(button);
        });
    };

    return (
        <div className="tiptap-editor-wrapper">
            {label && <label className="tiptap-label">{label}</label>}
            <textarea
                ref={hiddenTextareaRef}
                className="tip-tap-editor"
                name={name}
                defaultValue={value}
                style={{ display: 'none' }}
            />
            <div ref={editorRef} className="tiptap-editor-container">
                <div className="tiptap-editor-header"></div>
                <div className="tiptap-editor-content"></div>
                <div className="tiptap-editor-statusbar">
                    <span className="status-hierarchy">Paragraph</span>
                    <a href="https://tiptap.dev/" target="_blank" rel="noreferrer">
                        Powered by Tiptap
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TipTapEditor;