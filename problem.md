---
title: Problem
layout: form
description: Probleme und Reparaturen in der Wohnung
permalink: /problem/
---

<script src="https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js"></script>

<div class="helm-intro-questions">
  <h3>Bevor Sie das Formular ausfüllen:</h3>
  <ul>
    <li>Haben Sie schon in unseren <a href="/anliegen/">Hilfe-Artikeln</a> nachgeschaut? Dort finden Sie Antworten zu den häufigsten Problemen.</li>
    <li>Ist es ein <strong>Notfall</strong> (Wasser läuft aus, keine Heizung im Winter, Gasgeruch)? → <a href="/notfall/">Zur Notfall-Seite</a></li>
  </ul>
</div>

<div class="helm-contact-wrap">
    <div class="helm-form-card">
        <form id="helmContactForm">
            <!-- Hidden field for form type -->
            <input type="hidden" id="helmFormType" value="PROBLEM">

            <!-- Problem Description -->
            <div class="helm-form-group">
                <label class="helm-form-label">Was ist das Problem? <span class="helm-required">*</span></label>
                <textarea
                    id="helmMessage"
                    class="helm-form-textarea"
                    placeholder="Guten Tag Herr Helm, &#10;&#10;folgendes Problem ist aufgetreten:&#10;&#10;Wo: (z.B. Küche, Bad, Wohnzimmer)&#10;Was: (z.B. Wasserhahn tropft)&#10;Seit wann: (z.B. seit gestern)"
                    required
                ></textarea>
                <span class="helm-error"></span>
            </div>

            <!-- Contact Information -->
            <div class="helm-form-row">
                <div class="helm-form-group">
                    <label class="helm-form-label">Vorname <span class="helm-required">*</span></label>
                    <input
                        type="text"
                        id="helmFirstName"
                        class="helm-form-input"
                        placeholder="Vorname"
                        required
                        autocomplete="given-name"
                    >
                    <span class="helm-error"></span>
                </div>
                <div class="helm-form-group">
                    <label class="helm-form-label">Nachname <span class="helm-required">*</span></label>
                    <input
                        type="text"
                        id="helmLastName"
                        class="helm-form-input"
                        placeholder="Nachname"
                        required
                        autocomplete="family-name"
                    >
                    <span class="helm-error"></span>
                </div>
            </div>

            <div class="helm-form-row three-col">
                <div class="helm-form-group">
                    <label class="helm-form-label">Straße <span class="helm-required">*</span></label>
                    <input
                        type="text"
                        id="helmStreet"
                        class="helm-form-input"
                        placeholder="Musterstraße"
                        required
                        autocomplete="street-address"
                    >
                    <span class="helm-error"></span>
                </div>
                <div class="helm-form-group">
                    <label class="helm-form-label">Hausnr. <span class="helm-required">*</span></label>
                    <input
                        type="text"
                        id="helmHouseNumber"
                        class="helm-form-input"
                        placeholder="10"
                        required
                    >
                    <span class="helm-error"></span>
                </div>
            </div>

            <div class="helm-form-row">
                <div class="helm-form-group">
                    <label class="helm-form-label">PLZ <span class="helm-required">*</span></label>
                    <input
                        type="text"
                        id="helmZip"
                        class="helm-form-input"
                        placeholder="35390"
                        required
                        pattern="[0-9]{5}"
                        autocomplete="postal-code"
                    >
                    <span class="helm-error"></span>
                </div>
                <div class="helm-form-group">
                    <label class="helm-form-label">Stadt <span class="helm-required">*</span></label>
                    <input
                        type="text"
                        id="helmCity"
                        class="helm-form-input"
                        placeholder="Gießen"
                        required
                        autocomplete="address-level2"
                    >
                    <span class="helm-error"></span>
                </div>
            </div>

            <!-- Phone and Contact Preference -->
            <div class="helm-form-group">
                <label class="helm-form-label">Telefon (Mobil) <span class="helm-required">*</span></label>
                <input
                    type="tel"
                    id="helmPhone"
                    class="helm-form-input"
                    placeholder="0151 12345678"
                    required
                    autocomplete="tel"
                >
                <span class="helm-error"></span>
            </div>

            <div class="helm-form-group">
                <label class="helm-form-label">Wie sollen wir Sie kontaktieren? <span class="helm-required">*</span></label>
                <select id="helmPreferredContact" class="helm-form-select" required>
                    <option value="">Bitte wählen...</option>
                    <option value="anruf">Anruf</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">E-Mail</option>
                </select>
                <span class="helm-error"></span>
            </div>

            <!-- File Upload -->
            <div class="helm-form-group">
                <label class="helm-form-label">Fotos vom Problem (sehr hilfreich!)</label>
                <input
                    type="hidden"
                    id="helmFile"
                    name="file"
                    role="uploadcare-uploader"
                    data-public-key="5809383157500e7c854c"
                    data-images-only="false"
                    data-multiple="true"
                />
                <span class="helm-upload-label">Sie können Fotos oder PDF-Dateien hochladen - hilft uns sehr!</span>
            </div>

            <button type="submit" class="helm-form-btn" id="helmSubmitBtn">
                Problem melden
            </button>

            <div class="helm-form-privacy">
                Mit dem Absenden stimmen Sie zu, dass wir Sie kontaktieren. <a href="/datenschutz/" target="_blank">Datenschutz</a>
            </div>
        </form>

        <div class="helm-form-success" id="helmSuccess">
            <h3>Vielen Dank!</h3>
            <p>Wir haben Ihr Problem erhalten und kümmern uns schnellstmöglich darum.</p>
        </div>
    </div>
</div>
