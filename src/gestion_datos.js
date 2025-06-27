// ========================================
// INITIAL CONFIGURATION AND DATA
// ========================================

const notesDatabase = {
    note1: {
        id: 1,
        title: "Plans for future and other directions",
        content: "A Design Direction unifies everyone and adds meaning to web design. It's a combination of art and science that guides creative decisions.",
        categories: ["Work", "Planning"],
        date: "2025-04-27",
        isActive: true
    },
    note2: {
        id: 2,
        title: "A really long note to test the system's ability to handle large content",
        content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt..., lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt..., lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt..., lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt..., lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt..., lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt..., lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt..., lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt..., lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",     
        categories: ["Meetings", "Review"],
        date: "2025-06-25",
        isActive: true
    },
    note3: {
        id: 3,
        title: "Design exploration techniques",
        content: "Exploring different design methodologies and user experience principles for better product development.",
        categories: ["Design", "UX"],
        date: "2025-04-26",
        isActive: false
    }
};

const uniqueCategories = new Set();
const notesMetadata = new Map();

// ========================================
// REQUIRED LOOPS IMPLEMENTATION
// ========================================

console.log("=== DATA STRUCTURES DEMONSTRATION ===");

// for...in: Iterate through main object
console.log("\n1. Using for...in to iterate through notesDatabase:");
for (const key in notesDatabase) {
    const note = notesDatabase[key];
    console.log(`Key: ${key}, Title: ${note.title}`);
    
    note.categories.forEach(cat => uniqueCategories.add(cat));
    notesMetadata.set(note.id, {
        wordCount: note.content.split(' ').length,
        status: note.isActive ? 'Active' : 'Archived'
    });
}

// for...of: Iterate over Set
console.log("\n2. Using for...of to iterate through Set of categories:");
for (const category of uniqueCategories) {
    console.log(`Unique category: ${category}`);
}

// forEach(): Process Map
console.log("\n3. Using forEach() to process Map of metadata:");
notesMetadata.forEach((value, key) => {
    console.log(`Note ID ${key}: ${value.wordCount} words, Status: ${value.status}`);
});

// ========================================
// OBJECT METHODS
// ========================================

console.log("\n=== OBJECT METHODS ===");

const keys = Object.keys(notesDatabase);
console.log("\n4. Object.keys() - Object keys:", keys);

const values = Object.values(notesDatabase);
console.log("\n5. Object.values() - Number of notes:", values.length);

console.log("\n6. Object.entries() - Key-value pairs:");
Object.entries(notesDatabase).forEach(([key, value]) => {
    console.log(`${key}: "${value.title}" (${value.categories.join(', ')})`);
});

// ========================================
// HELPER FUNCTION
// ========================================

/**
 * Find a note by its ID in the database
 * @param {number} id - The ID of the note to find
 * @returns {Object|null} Object containing key and note, or null if not found
 */
function findNoteById(id) {
    for (const key in notesDatabase) {
        if (notesDatabase[key].id === id) {
            return { key, note: notesDatabase[key] };
        }
    }
    return null;
}

// ========================================
// CRUD FUNCTIONS
// ========================================

/**
 * Create a new note and add it to the database
 * @param {string} title - The title of the note
 * @param {string} content - The content/body of the note
 * @param {Array|string} categories - Categories for the note (array or single string)
 * @param {boolean} [showMessage=true] - Whether to show success message
 * @returns {string} The key of the newly created note
 */
function createNote(title, content, categories, showMessage = true) {
    const newId = Math.max(...Object.values(notesDatabase).map(n => n.id)) + 1;
    const newKey = `note${newId}`;
    
    const processedCategories = Array.isArray(categories) ? categories : [categories || 'General'];
    processedCategories.forEach(cat => uniqueCategories.add(cat));
    
    notesDatabase[newKey] = {
        id: newId,
        title,
        content,
        categories: processedCategories,
        date: new Date().toISOString().split('T')[0],
        isActive: true
    };
    
    notesMetadata.set(newId, {
        wordCount: content.split(' ').length,
        status: 'Active'
    });
    
    console.log(`✅ Note created: "${title}"`);
    
    if (showMessage) {
        showSuccessMessage(`"${title}" has been created`, 'create');
    }
    
    return newKey;
}

/**
 * Get all active (non-archived) notes from the database
 * @returns {Array} Array of active note objects
 */
function getActiveNotes() {
    return Object.values(notesDatabase).filter(note => note.isActive);
}

/**
 * Archive a note (soft delete - sets isActive to false)
 * @param {number} id - The ID of the note to archive
 * @returns {boolean} True if archived successfully, false if note not found
 */
function archiveNote(id) {
    const found = findNoteById(id);
    if (!found) return false;
    
    found.note.isActive = false;
    notesMetadata.set(id, {
        ...notesMetadata.get(id),
        status: 'Archived'
    });
    
    console.log(`📁 Note archived: "${found.note.title}"`);
    showSuccessMessage(`"${found.note.title}" has been archived`, 'archive');
    
    return true;
}

/**
 * Search for notes by title or content
 * @param {string} searchTerm - The term to search for
 * @returns {Array} Array of notes matching the search term
 */
function searchNotes(searchTerm) {
    return Object.values(notesDatabase).filter(note => 
        note.isActive && 
        (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         note.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
}

/**
 * Filter notes by a specific category
 * @param {string} category - The category to filter by
 * @returns {Array} Array of notes in the specified category
 */
function filterByCategory(category) {
    return Object.values(notesDatabase).filter(note => 
        note.isActive && note.categories.includes(category)
    );
}

/**
 * Update an existing note's information
 * @param {number} id - The ID of the note to update
 * @param {string} title - New title for the note
 * @param {string} content - New content for the note
 * @param {Array|string} categories - New categories for the note
 * @returns {boolean} True if updated successfully, false if note not found
 */
function updateNote(id, title, content, categories) {
    const found = findNoteById(id);
    if (!found) return false;
    
    const note = found.note;
    const processedCategories = Array.isArray(categories) ? categories : [categories || 'General'];
    
    processedCategories.forEach(cat => uniqueCategories.add(cat));
    
    note.title = title;
    note.content = content;
    note.categories = processedCategories;
    note.date = new Date().toISOString().split('T')[0];
    
    notesMetadata.set(id, {
        wordCount: content.split(' ').length,
        status: 'Active'
    });
    
    console.log(`✅ Note updated: "${title}"`);
    showSuccessMessage(`"${title}" has been updated`, 'edit');
    
    return true;
}

/**
 * Open the edit modal for a specific note
 * @param {number} noteId - The ID of the note to edit
 */
function editNote(noteId) {
    const found = findNoteById(noteId);
    if (found) showNoteModal(found.note);
}

/**
 * Create a duplicate copy of an existing note
 * @param {number} noteId - The ID of the note to duplicate
 */
function duplicateNote(noteId) {
    const found = findNoteById(noteId);
    if (!found) return;
    
    const original = found.note;
    createNote(`${original.title} (Copy)`, original.content, [...original.categories], false);
    renderNotes();
    hideAllDropdowns();
    
    console.log(`📋 Note duplicated`);
    showSuccessMessage(`"${original.title}" has been duplicated`, 'duplicate');
}

/**
 * Permanently delete a note from the database
 * @param {number} noteId - The ID of the note to delete permanently
 * @returns {boolean} True if deleted successfully, false if note not found
 */
function deleteNotePermanently(noteId) {
    const found = findNoteById(noteId);
    if (!found) return false;
    
    const noteTitle = found.note.title;
    
    delete notesDatabase[found.key];
    notesMetadata.delete(noteId);
    
    console.log(`🗑️ Note permanently deleted: "${noteTitle}"`);
    
    renderNotes();
    hideConfirmModal();
    showSuccessMessage(`"${noteTitle}" has been deleted permanently`, 'delete');
    
    return true;
}

// ========================================
// MODAL FUNCTIONS
// ========================================

let selectedCategories = [];
let editingNoteId = null;

/**
 * Show the note creation/editing modal
 * @param {Object|null} [note=null] - Note object to edit, or null for creating new note
 */
function showNoteModal(note = null) {
    const modal = document.getElementById('noteModal');
    const form = document.getElementById('noteForm');
    
    form.reset();
    selectedCategories = [];
    
    if (note) {
        // Edit mode
        editingNoteId = note.id;
        document.getElementById('modalTitle').textContent = 'Edit Note';
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteContent').value = note.content;
        selectedCategories = [...note.categories];
        document.getElementById('saveBtn').textContent = 'Update Note';
    } else {
        // Create mode
        editingNoteId = null;
        document.getElementById('modalTitle').textContent = 'Create New Note';
        document.getElementById('saveBtn').textContent = 'Save Note';
    }
    
    updateSelectedCategories();
    updateAvailableCategories();
    modal.classList.add('active');
    document.getElementById('noteTitle').focus();
}

/**
 * Hide the note creation/editing modal
 */
function hideNoteModal() {
    document.getElementById('noteModal').classList.remove('active');
    selectedCategories = [];
    editingNoteId = null;
}

/**
 * Add a new category to the selected categories list
 */
function addCategory() {
    const input = document.getElementById('noteCategory');
    const value = input.value.trim();
    
    if (value && !selectedCategories.includes(value)) {
        selectedCategories.push(value);
        input.value = '';
        updateSelectedCategories();
        updateAvailableCategories();
    }
}

/**
 * Remove a category from the selected categories list
 * @param {string} category - The category to remove
 */
function removeCategory(category) {
    selectedCategories = selectedCategories.filter(cat => cat !== category);
    updateSelectedCategories();
    updateAvailableCategories();
}

/**
 * Update the visual display of selected categories in the modal
 */
function updateSelectedCategories() {
    const container = document.getElementById('selectedCategories');
    if (!container) return;
    
    container.innerHTML = selectedCategories.map(cat => 
        `<div class="category-tag">
            ${cat}
            <button type="button" class="remove-category" onclick="removeCategory('${cat}')">×</button>
        </div>`
    ).join('');
}

/**
 * Update the display of available categories that can be selected
 */
function updateAvailableCategories() {
    const container = document.getElementById('availableCategories');
    if (!container) return;
    
    container.innerHTML = '';
    
    const availableCategories = Array.from(uniqueCategories).filter(cat => 
        !selectedCategories.includes(cat)
    );
    
    if (availableCategories.length === 0) {
        container.innerHTML = '<p class="no-categories">All categories are already selected</p>';
        return;
    }
    
    availableCategories.forEach(category => {
        const categoryButton = document.createElement('button');
        categoryButton.type = 'button';
        categoryButton.className = 'available-category-btn';
        categoryButton.textContent = category;
        categoryButton.onclick = () => selectAvailableCategory(category);
        container.appendChild(categoryButton);
    });
}

/**
 * Select a category from the available categories list
 * @param {string} category - The category to select
 */
function selectAvailableCategory(category) {
    if (!selectedCategories.includes(category)) {
        selectedCategories.push(category);
        updateSelectedCategories();
        updateAvailableCategories();
    }
}

/**
 * Handle the form submission for creating or updating a note
 * @param {Event} e - The form submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    
    if (!title || !content) {
        alert('Please fill in all required fields');
        return;
    }
    
    const categories = selectedCategories.length > 0 ? selectedCategories : ['General'];
    
    if (editingNoteId) {
        updateNote(editingNoteId, title, content, categories);
    } else {
        createNote(title, content, categories);
    }
    
    hideNoteModal();
    renderNotes();
}

// ========================================
// DOM MANIPULATION
// ========================================

/**
 * Render all active notes to the DOM
 */
function renderNotes() {
    const notesList = document.querySelector('.notes-list');
    if (!notesList) return;
    
    notesList.innerHTML = '';
    getActiveNotes().forEach(note => {
        notesList.appendChild(createNoteElement(note));
    });
}

/**
 * Create a DOM element for a single note
 * @param {Object} note - The note object to create an element for
 * @returns {HTMLElement} The created note element
 */
function createNoteElement(note) {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note-item';
    noteDiv.dataset.noteId = note.id;
    
    const metadata = notesMetadata.get(note.id) || { wordCount: 0, status: 'Active' };
    const readingTime = Math.ceil(metadata.wordCount / 200);
    
    noteDiv.innerHTML = `
        <div class="note-header">
            <p class="date">${new Date(note.date).toLocaleDateString()}</p>
            <div class="note-actions">
                <button class="note-action-btn" onclick="editNote(${note.id})" title="Edit">✏️</button>
                <button class="note-action-btn" onclick="toggleNoteMenu(event, ${note.id})" title="More">⋯</button>
                <div class="note-dropdown" id="dropdown-${note.id}">
                    <button class="dropdown-item" onclick="editNote(${note.id})">✏️ Edit</button>
                    <button class="dropdown-item" onclick="duplicateNote(${note.id})">📋 Duplicate</button>
                    <button class="dropdown-item" onclick="archiveNote(${note.id}); renderNotes(); hideAllDropdowns()">📁 Archive</button>
                    <button class="dropdown-item danger" onclick="confirmDeleteNote(${note.id})">🗑️ Delete</button>
                </div>
            </div>
        </div>
        <h3 class="note-title">${note.title}</h3>
        <div class="note-metadata-preview">
            <div class="note-stats-compact">
                <span>📊 ${metadata.wordCount} words</span>
                <span>⏱️ ${readingTime} min</span>
                <span class="status-badge ${metadata.status.toLowerCase()}">${metadata.status}</span>
            </div>
        </div>
        <p class="note-content">${note.content}</p>
        <div class="categories">
            ${note.categories.map(cat => `<div class="note-category">${cat}</div>`).join('')}
        </div>
        
        <div class="note-expanded-content">
            <div class="note-metadata">
                <div class="note-stats">
                    <div class="stat-item">
                        <span>📊</span>
                        <span>${metadata.wordCount} words</span>
                    </div>
                    <div class="stat-item">
                        <span>🔤</span>
                        <span>${note.content.length} characters</span>
                    </div>
                    <div class="stat-item">
                        <span>⏱️</span>
                        <span>${readingTime} min read</span>
                    </div>
                </div>
                <div class="note-status">
                    <span class="status-badge ${metadata.status.toLowerCase()}">${metadata.status}</span>
                </div>
            </div>
        </div>
        
        <div class="expand-indicator">
            ↓
        </div>
    `;
    
    noteDiv.addEventListener('click', (e) => {
        if (!e.target.closest('.note-actions')) {
            toggleNoteExpansion(note.id);
        }
    });
    
    return noteDiv;
}

/**
 * Toggle the expansion state of a note (show/hide detailed view)
 * @param {number} noteId - The ID of the note to toggle
 */
function toggleNoteExpansion(noteId) {
    const noteElement = document.querySelector(`[data-note-id="${noteId}"]`);
    if (!noteElement) return;
    
    // Close other expanded notes
    document.querySelectorAll('.note-item.expanded').forEach(note => {
        if (note.dataset.noteId !== noteId.toString()) {
            note.classList.remove('expanded');
            const otherIndicator = note.querySelector('.expand-indicator');
            if (otherIndicator) {
                otherIndicator.style.transform = 'rotate(0deg)';
                otherIndicator.style.transition = 'transform 0.3s ease';
            }
        }
    });
    
    // Toggle current note
    const isExpanding = !noteElement.classList.contains('expanded');
    noteElement.classList.toggle('expanded');
    
    // Rotate indicator
    const expandIndicator = noteElement.querySelector('.expand-indicator');
    if (expandIndicator) {
        if (isExpanding) {
            expandIndicator.style.transform = 'rotate(180deg)';
            expandIndicator.style.transition = 'transform 0.3s ease';
        } else {
            expandIndicator.style.transform = 'rotate(0deg)';
            expandIndicator.style.transition = 'transform 0.3s ease';
        }
    }
    
    // Smooth scroll if expanding
    if (isExpanding) {
        setTimeout(() => {
            noteElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 150);
    }
}

/**
 * Toggle the dropdown menu for a specific note
 * @param {Event} event - The click event
 * @param {number} noteId - The ID of the note whose menu to toggle
 */
function toggleNoteMenu(event, noteId) {
    event.stopPropagation();
    hideAllDropdowns();
    document.getElementById(`dropdown-${noteId}`).classList.toggle('active');
}

/**
 * Hide all dropdown menus
 */
function hideAllDropdowns() {
    document.querySelectorAll('.note-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

/**
 * Show the delete confirmation modal for a specific note
 * @param {number} noteId - The ID of the note to confirm deletion for
 */
function confirmDeleteNote(noteId) {
    const found = findNoteById(noteId);
    if (!found) return;
    
    hideAllDropdowns();
    
    document.getElementById('previewTitle').textContent = found.note.title;
    document.getElementById('previewContent').textContent = found.note.content.substring(0, 200) + '...';
    document.getElementById('previewCategories').innerHTML = found.note.categories.map(cat => 
        `<span class="category-tag">${cat}</span>`
    ).join('');
    
    document.getElementById('confirmDeleteBtn').setAttribute('data-note-id', noteId);
    document.getElementById('confirmModal').classList.add('active');
}

/**
 * Hide the delete confirmation modal
 */
function hideConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
}

/**
 * Collapse all expanded notes back to their normal state
 */
function collapseAllNotes() {
    document.querySelectorAll('.note-item.expanded').forEach(note => {
        note.classList.remove('expanded');
        const indicator = note.querySelector('.expand-indicator');
        if (indicator) {
            indicator.style.transform = 'rotate(0deg)';
            indicator.style.transition = 'transform 0.3s ease';
        }
    });
}

/**
 * Show a success message with optional type-specific styling
 * @param {string} message - The message to display
 * @param {string} [type='success'] - The type of message (create, edit, duplicate, delete, archive)
 */
function showSuccessMessage(message, type = 'success') {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    
    const icons = { create: '✅', edit: '✏️', duplicate: '📋', delete: '🗑️', archive: '📁' };
    
    successDiv.innerHTML = `<div class="success-content ${type}">${icons[type] || '✅'} ${message}</div>`;
    
    // Handle message stacking
    const existingMessages = document.querySelectorAll('.success-message');
    if (existingMessages.length > 0) {
        successDiv.style.top = `${20 + (existingMessages.length * 60)}px`;
    }
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
        // Reposition remaining messages
        const remainingMessages = document.querySelectorAll('.success-message');
        remainingMessages.forEach((message, index) => {
            message.style.top = `${20 + (index * 60)}px`;
        });
    }, 3000);
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('📝 Notes App initialized');
    
    // Basic events
    document.querySelector('.new-note')?.addEventListener('click', () => showNoteModal());
    document.getElementById('noteForm')?.addEventListener('submit', handleFormSubmit);
    document.getElementById('addCategoryBtn')?.addEventListener('click', addCategory);
    document.getElementById('confirmDeleteBtn')?.addEventListener('click', () => {
        const noteId = parseInt(document.getElementById('confirmDeleteBtn').getAttribute('data-note-id'));
        deleteNotePermanently(noteId);
    });
    
    // Modal close events
    ['closeModal', 'cancelBtn'].forEach(id => {
        document.getElementById(id)?.addEventListener('click', hideNoteModal);
    });
    
    ['closeConfirmModal', 'cancelDeleteBtn'].forEach(id => {
        document.getElementById(id)?.addEventListener('click', hideConfirmModal);
    });
    
    // Close modals on overlay click
    const modalOverlay = document.getElementById('noteModal');
    const confirmModalOverlay = document.getElementById('confirmModal');
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) hideNoteModal();
        });
    }
    
    if (confirmModalOverlay) {
        confirmModalOverlay.addEventListener('click', (e) => {
            if (e.target === confirmModalOverlay) hideConfirmModal();
        });
    }
    
    // Category input enter key
    document.getElementById('noteCategory')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCategory();
        }
    });
    
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            console.log(`Navigated to: ${e.target.textContent.trim()}`);
        });
    });
    
    // Global click handler
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.note-item') && !e.target.closest('.note-actions')) {
            hideAllDropdowns();
            collapseAllNotes();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideAllDropdowns();
            hideConfirmModal();
            collapseAllNotes();
        }
    });
    
    renderNotes();
});

// ========================================
// DEMONSTRATION
// ========================================

console.log("\n=== FUNCTIONALITY TESTS ===");

createNote("Test note", "Test content", ["Testing", "Demo"]);
console.log("Active notes:", getActiveNotes().map(n => n.title));
console.log("Search 'design':", searchNotes("design").map(n => n.title));
console.log("Work notes:", filterByCategory("Work").map(n => n.title));

console.log(`\nTotal notes: ${Object.keys(notesDatabase).length}`);
console.log(`Active notes: ${getActiveNotes().length}`);
console.log(`Categories: ${Array.from(uniqueCategories)}`);
console.log("\n✅ Demonstration completed.");