const {expect} = require('chai');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Curation = require('../../lib/curation');

function getFixture(file) {
  return fs.readFileSync(path.join(__dirname, '../fixtures', file), {encoding: 'utf8'});
}

describe('Curations', () => {
  it('should identify invalid yaml files', () => {
    const content = '@#$%%';
    const curation = Curation({content});
    expect(curation.isValid).to.be.false;
    expect(curation.errors[0].message).to.equal('Invalid yaml');
  });

  it('should identify invalid curations', () => {
    const content = getFixture('curation-invalid.yaml');
    const curation = Curation({content});
    expect(curation.isValid).to.be.false;
    expect(curation.errors[0].message).to.equal('Invalid curation');
  });

  it('should identify valid curations', () => {
    const content = getFixture('curation-valid.yaml');
    const curation = Curation({content});
    expect(curation.isValid).to.be.true;
    expect(curation.errors.length).to.not.be.ok;
  });

  it('should also accept yaml data objects', () => {
    const data = yaml.safeLoad('foo: bar');
    const curation = Curation({data});
    expect(curation.isValid).to.be.false;
    expect(curation.errors[0].message).to.equal('Invalid curation');
  });
});
