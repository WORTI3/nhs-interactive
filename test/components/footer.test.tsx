import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '../../app/[locale]/components/nhs/Footer';
import { load } from 'cheerio';

describe('NHSFooter component', () => {
  test('rendered component should match snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  test('should render the component with the correct links & elements', () => {
    const { container } = render(<Footer />);
    const html = container.innerHTML;
    const $ = load(html);
    const nhsFooter = $('.nhsuk-footer');
  
    expect(nhsFooter.text()).toContain('Github');
    expect(nhsFooter.find('a').length).toBe(1);
  });
});
