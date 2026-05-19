"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

const MessageForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [mountTime, setMountTime] = useState<number>(0);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        setMountTime(Date.now());
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus('idle');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            phoneNumber: `${formData.get('countryCode')} ${formData.get('phoneNumber')}`,
            message: formData.get('message'),
            website_url: formData.get('website_url'),
            timestamp: mountTime,
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send message');
            }

            setFormStatus('success');
            formRef.current?.reset();
        } catch (error) {
            setFormStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-[640px] mx-auto px-6 md:px-0 space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-normal">Message us</h2>
                <p className="text-[#6B7280]">Fill up the form and our team will get back to you within 24 hours</p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="absolute opacity-0 -z-10 w-0 h-0 overflow-hidden">
                    <label htmlFor="website_url">Website URL</label>
                    <input
                        type="text"
                        name="website_url"
                        id="website_url"
                        tabIndex={-1}
                        autoComplete="off"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border-0"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border-0"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="email"
                        type="email"
                        placeholder="you@gmail.com"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border-0"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm">
                        Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="subject"
                        type="text"
                        placeholder="What is this about?"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border-0"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm">Phone Number</label>
                    <div className="flex space-x-2">
                        <select
                            name="countryCode"
                            className="w-1/4 px-4 py-3 rounded-lg bg-[#F9FAFB] border-0"
                        >
                            <option value="+1">+1 (USA)</option>
                            <option value="+93">+93 (Afghanistan)</option>
                            <option value="+355">+355 (Albania)</option>
                            <option value="+213">+213 (Algeria)</option>
                            <option value="+1684">+1684 (American Samoa)</option>
                            <option value="+376">+376 (Andorra)</option>
                            <option value="+244">+244 (Angola)</option>
                            <option value="+1264">+1264 (Anguilla)</option>
                            <option value="+1268">+1268 (Antigua and Barbuda)</option>
                            <option value="+54">+54 (Argentina)</option>
                            <option value="+374">+374 (Armenia)</option>
                            <option value="+297">+297 (Aruba)</option>
                            <option value="+61">+61 (Australia)</option>
                            <option value="+43">+43 (Austria)</option>
                            <option value="+994">+994 (Azerbaijan)</option>
                            <option value="+1242">+1242 (Bahamas)</option>
                            <option value="+973">+973 (Bahrain)</option>
                            <option value="+880">+880 (Bangladesh)</option>
                            <option value="+1246">+1246 (Barbados)</option>
                            <option value="+375">+375 (Belarus)</option>
                            <option value="+32">+32 (Belgium)</option>
                            <option value="+501">+501 (Belize)</option>
                            <option value="+229">+229 (Benin)</option>
                            <option value="+1441">+1441 (Bermuda)</option>
                            <option value="+975">+975 (Bhutan)</option>
                            <option value="+591">+591 (Bolivia)</option>
                            <option value="+387">+387 (Bosnia and Herzegovina)</option>
                            <option value="+267">+267 (Botswana)</option>
                            <option value="+55">+55 (Brazil)</option>
                            <option value="+246">+246 (British Indian Ocean Territory)</option>
                            <option value="+673">+673 (Brunei)</option>
                            <option value="+359">+359 (Bulgaria)</option>
                            <option value="+226">+226 (Burkina Faso)</option>
                            <option value="+257">+257 (Burundi)</option>
                            <option value="+855">+855 (Cambodia)</option>
                            <option value="+237">+237 (Cameroon)</option>
                            <option value="+1">+1 (Canada)</option>
                            <option value="+238">+238 (Cape Verde)</option>
                            <option value="+1345">+1345 (Cayman Islands)</option>
                            <option value="+236">+236 (Central African Republic)</option>
                            <option value="+235">+235 (Chad)</option>
                            <option value="+56">+56 (Chile)</option>
                            <option value="+86">+86 (China)</option>
                            <option value="+57">+57 (Colombia)</option>
                            <option value="+269">+269 (Comoros)</option>
                            <option value="+242">+242 (Congo)</option>
                            <option value="+243">+243 (Congo, Democratic Republic of the)</option>
                            <option value="+682">+682 (Cook Islands)</option>
                            <option value="+506">+506 (Costa Rica)</option>
                            <option value="+385">+385 (Croatia)</option>
                            <option value="+53">+53 (Cuba)</option>
                            <option value="+599">+599 (Curacao)</option>
                            <option value="+357">+357 (Cyprus)</option>
                            <option value="+420">+420 (Czech Republic)</option>
                            <option value="+45">+45 (Denmark)</option>
                            <option value="+253">+253 (Djibouti)</option>
                            <option value="+1767">+1767 (Dominica)</option>
                            <option value="+1">+1 (Dominican Republic)</option>
                            <option value="+593">+593 (Ecuador)</option>
                            <option value="+20">+20 (Egypt)</option>
                            <option value="+503">+503 (El Salvador)</option>
                            <option value="+240">+240 (Equatorial Guinea)</option>
                            <option value="+291">+291 (Eritrea)</option>
                            <option value="+372">+372 (Estonia)</option>
                            <option value="+251">+251 (Ethiopia)</option>
                            <option value="+500">+500 (Falkland Islands)</option>
                            <option value="+298">+298 (Faroe Islands)</option>
                            <option value="+679">+679 (Fiji)</option>
                            <option value="+358">+358 (Finland)</option>
                            <option value="+33">+33 (France)</option>
                            <option value="+594">+594 (French Guiana)</option>
                            <option value="+689">+689 (French Polynesia)</option>
                            <option value="+241">+241 (Gabon)</option>
                            <option value="+220">+220 (Gambia)</option>
                            <option value="+995">+995 (Georgia)</option>
                            <option value="+49">+49 (Germany)</option>
                            <option value="+233">+233 (Ghana)</option>
                            <option value="+350">+350 (Gibraltar)</option>
                            <option value="+30">+30 (Greece)</option>
                            <option value="+299">+299 (Greenland)</option>
                            <option value="+1473">+1473 (Grenada)</option>
                            <option value="+590">+590 (Guadeloupe)</option>
                            <option value="+1671">+1671 (Guam)</option>
                            <option value="+502">+502 (Guatemala)</option>
                            <option value="+224">+224 (Guinea)</option>
                            <option value="+245">+245 (Guinea-Bissau)</option>
                            <option value="+592">+592 (Guyana)</option>
                            <option value="+509">+509 (Haiti)</option>
                            <option value="+504">+504 (Honduras)</option>
                            <option value="+852">+852 (Hong Kong)</option>
                            <option value="+36">+36 (Hungary)</option>
                            <option value="+354">+354 (Iceland)</option>
                            <option value="+91">+91 (India)</option>
                            <option value="+62">+62 (Indonesia)</option>
                            <option value="+98">+98 (Iran)</option>
                            <option value="+964">+964 (Iraq)</option>
                            <option value="+353">+353 (Ireland)</option>
                            <option value="+972">+972 (Israel)</option>
                            <option value="+39">+39 (Italy)</option>
                            <option value="+225">+225 (Ivory Coast)</option>
                            <option value="+1876">+1876 (Jamaica)</option>
                            <option value="+81">+81 (Japan)</option>
                            <option value="+962">+962 (Jordan)</option>
                            <option value="+7">+7 (Kazakhstan)</option>
                            <option value="+254">+254 (Kenya)</option>
                            <option value="+686">+686 (Kiribati)</option>
                            <option value="+383">+383 (Kosovo)</option>
                            <option value="+965">+965 (Kuwait)</option>
                            <option value="+996">+996 (Kyrgyzstan)</option>
                            <option value="+856">+856 (Laos)</option>
                            <option value="+371">+371 (Latvia)</option>
                            <option value="+961">+961 (Lebanon)</option>
                            <option value="+266">+266 (Lesotho)</option>
                            <option value="+231">+231 (Liberia)</option>
                            <option value="+218">+218 (Libya)</option>
                            <option value="+423">+423 (Liechtenstein)</option>
                            <option value="+370">+370 (Lithuania)</option>
                            <option value="+352">+352 (Luxembourg)</option>
                            <option value="+853">+853 (Macau)</option>
                            <option value="+389">+389 (North Macedonia)</option>
                            <option value="+261">+261 (Madagascar)</option>
                            <option value="+265">+265 (Malawi)</option>
                            <option value="+60">+60 (Malaysia)</option>
                            <option value="+960">+960 (Maldives)</option>
                            <option value="+223">+223 (Mali)</option>
                            <option value="+356">+356 (Malta)</option>
                            <option value="+692">+692 (Marshall Islands)</option>
                            <option value="+596">+596 (Martinique)</option>
                            <option value="+222">+222 (Mauritania)</option>
                            <option value="+230">+230 (Mauritius)</option>
                            <option value="+262">+262 (Mayotte)</option>
                            <option value="+52">+52 (Mexico)</option>
                            <option value="+691">+691 (Micronesia)</option>
                            <option value="+373">+373 (Moldova)</option>
                            <option value="+377">+377 (Monaco)</option>
                            <option value="+976">+976 (Mongolia)</option>
                            <option value="+382">+382 (Montenegro)</option>
                            <option value="+1664">+1664 (Montserrat)</option>
                            <option value="+212">+212 (Morocco)</option>
                            <option value="+258">+258 (Mozambique)</option>
                            <option value="+95">+95 (Myanmar)</option>
                            <option value="+264">+264 (Namibia)</option>
                            <option value="+674">+674 (Nauru)</option>
                            <option value="+977">+977 (Nepal)</option>
                            <option value="+31">+31 (Netherlands)</option>
                            <option value="+687">+687 (New Caledonia)</option>
                            <option value="+64">+64 (New Zealand)</option>
                            <option value="+505">+505 (Nicaragua)</option>
                            <option value="+227">+227 (Niger)</option>
                            <option value="+234">+234 (Nigeria)</option>
                            <option value="+683">+683 (Niue)</option>
                            <option value="+672">+672 (Norfolk Island)</option>
                            <option value="+850">+850 (North Korea)</option>
                            <option value="+47">+47 (Norway)</option>
                            <option value="+968">+968 (Oman)</option>
                            <option value="+92">+92 (Pakistan)</option>
                            <option value="+680">+680 (Palau)</option>
                            <option value="+970">+970 (Palestine)</option>
                            <option value="+507">+507 (Panama)</option>
                            <option value="+675">+675 (Papua New Guinea)</option>
                            <option value="+595">+595 (Paraguay)</option>
                            <option value="+51">+51 (Peru)</option>
                            <option value="+63">+63 (Philippines)</option>
                            <option value="+48">+48 (Poland)</option>
                            <option value="+351">+351 (Portugal)</option>
                            <option value="+1">+1 (Puerto Rico)</option>
                            <option value="+974">+974 (Qatar)</option>
                            <option value="+242">+242 (Republic of the Congo)</option>
                            <option value="+40">+40 (Romania)</option>
                            <option value="+7">+7 (Russia)</option>
                            <option value="+250">+250 (Rwanda)</option>
                            <option value="+590">+590 (Saint Barthelemy)</option>
                            <option value="+290">+290 (Saint Helena)</option>
                            <option value="+1869">+1869 (Saint Kitts and Nevis)</option>
                            <option value="+1758">+1758 (Saint Lucia)</option>
                            <option value="+590">+590 (Saint Martin)</option>
                            <option value="+508">+508 (Saint Pierre and Miquelon)</option>
                            <option value="+1784">+1784 (Saint Vincent and the Grenadines)</option>
                            <option value="+685">+685 (Samoa)</option>
                            <option value="+378">+378 (San Marino)</option>
                            <option value="+239">+239 (Sao Tome and Principe)</option>
                            <option value="+966">+966 (Saudi Arabia)</option>
                            <option value="+221">+221 (Senegal)</option>
                            <option value="+381">+381 (Serbia)</option>
                            <option value="+248">+248 (Seychelles)</option>
                            <option value="+232">+232 (Sierra Leone)</option>
                            <option value="+65">+65 (Singapore)</option>
                            <option value="+421">+421 (Slovakia)</option>
                            <option value="+386">+386 (Slovenia)</option>
                            <option value="+677">+677 (Solomon Islands)</option>
                            <option value="+252">+252 (Somalia)</option>
                            <option value="+27">+27 (South Africa)</option>
                            <option value="+82">+82 (South Korea)</option>
                            <option value="+211">+211 (South Sudan)</option>
                            <option value="+34">+34 (Spain)</option>
                            <option value="+94">+94 (Sri Lanka)</option>
                            <option value="+249">+249 (Sudan)</option>
                            <option value="+597">+597 (Suriname)</option>
                            <option value="+268">+268 (Eswatini)</option>
                            <option value="+46">+46 (Sweden)</option>
                            <option value="+41">+41 (Switzerland)</option>
                            <option value="+963">+963 (Syria)</option>
                            <option value="+886">+886 (Taiwan)</option>
                            <option value="+992">+992 (Tajikistan)</option>
                            <option value="+255">+255 (Tanzania)</option>
                            <option value="+66">+66 (Thailand)</option>
                            <option value="+670">+670 (Timor-Leste)</option>
                            <option value="+228">+228 (Togo)</option>
                            <option value="+690">+690 (Tokelau)</option>
                            <option value="+676">+676 (Tonga)</option>
                            <option value="+1868">+1868 (Trinidad and Tobago)</option>
                            <option value="+216">+216 (Tunisia)</option>
                            <option value="+90">+90 (Turkey)</option>
                            <option value="+993">+993 (Turkmenistan)</option>
                            <option value="+1649">+1649 (Turks and Caicos Islands)</option>
                            <option value="+688">+688 (Tuvalu)</option>
                            <option value="+256">+256 (Uganda)</option>
                            <option value="+380">+380 (Ukraine)</option>
                            <option value="+971">+971 (United Arab Emirates)</option>
                            <option value="+44">+44 (United Kingdom)</option>
                            <option value="+1">+1 (United States)</option>
                            <option value="+598">+598 (Uruguay)</option>
                            <option value="+998">+998 (Uzbekistan)</option>
                            <option value="+678">+678 (Vanuatu)</option>
                            <option value="+58">+58 (Venezuela)</option>
                            <option value="+84">+84 (Vietnam)</option>
                            <option value="+681">+681 (Wallis and Futuna)</option>
                            <option value="+967">+967 (Yemen)</option>
                            <option value="+260">+260 (Zambia)</option>
                            <option value="+263">+263 (Zimbabwe)</option>
                        </select>
                        <input
                            name="phoneNumber"
                            type="tel"
                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                            maxLength={10}
                            placeholder="123-456-7890"
                            className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border-0"
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                e.target.value = value;
                            }}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm">
                        Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="message"
                        placeholder="Leave us a message"
                        rows={6}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border-0 resize-none"
                    />
                </div>

                {formStatus === 'success' && (
                    <p className="text-green-600 text-sm">Message sent successfully! We&apos;ll get back to you soon.</p>
                )}
                {formStatus === 'error' && (
                    <p className="text-red-600 text-sm">{errorMessage}</p>
                )}

                <Button
                    type="submit"
                    className="w-full py-6 rounded-lg text-base"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
            </form>
        </div>
    );
};

export default MessageForm;